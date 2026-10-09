import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm, cp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validateConfig, validateSite, filesUnder, publishSnapshot } from '../scripts/preview-tools.mjs';
import { buildHub } from '../scripts/build-hub.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(path.join(root, 'prototypes.json'), 'utf8'));
const clone = () => structuredClone(config);

test('publication destinations, candidate branches, and pinned revisions are validated', () => {
  assert.equal(validateConfig(config), config);
  for (const mutate of [
    (c) => { c.repository = 'another/repository'; },
    (c) => { c.prototypes[0].branch = 'main'; },
    (c) => { c.prototypes[0].slug = '../main'; },
    (c) => { c.prototypes[0].revision = 'main'; },
    (c) => { c.prototypes[0].en = ''; },
  ]) { const c = clone(); mutate(c); assert.throws(() => validateConfig(c)); }
});

test('all saved review routes and directory links are present', async () => {
  assert.equal((await validateSite(path.join(root, 'site'), config)).length, 9);
});

test('directory generation escapes content and never links to pending candidates', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-hub-test-'));
  try {
    const c = clone(); c.prototypes[0].es = '<script>alert("example")</script>';
    await buildHub(c, directory);
    const html = await readFile(path.join(directory, 'es/index.html'), 'utf8');
    assert.ok(html.includes('&lt;script&gt;alert(&quot;example&quot;)&lt;/script&gt;'));
    assert.ok(html.includes('/prototypes/03-frequency/en/'));
    assert.ok(!html.includes('/prototypes/04-modular-lab/'));
    assert.equal(await readFile(path.join(directory, 'index.html'), 'utf8'), html);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

test('validation rejects broken copied links and symlink publication inputs', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-links-test-'));
  try {
    await cp(path.join(root, 'site'), directory, { recursive: true });
    const page = path.join(directory, 'prototypes/03-frequency/es/index.html');
    await writeFile(page, (await readFile(page, 'utf8')).replace('href="../en/index.html"', 'href="../missing/index.html"'));
    await assert.rejects(validateSite(directory, config), /ENOENT/);
    await mkdir(path.join(directory, 'input'));
    await symlink(page, path.join(directory, 'input', 'linked.html'));
    await assert.rejects(filesUnder(path.join(directory, 'input')), /Symlinks/);
    await symlink(path.join(directory, 'input'), path.join(directory, 'linked-directory'));
    await assert.rejects(filesUnder(path.join(directory, 'linked-directory')), /regular directory/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});

function apiHarness({ raced = false, sameTree = false, rejectRef = false } = {}) {
  const calls = [];
  let reads = 0;
  const api = (endpoint, method = 'GET', body) => {
    calls.push({ endpoint, method, body });
    if (endpoint.startsWith('git/ref/heads/')) return { object: { sha: ++reads > 1 && raced ? 'someone-else' : 'old-head' } };
    if (endpoint === 'git/commits/old-head') return { tree: { sha: 'old-tree' } };
    if (endpoint === 'git/trees') return { sha: sameTree ? 'old-tree' : 'new-tree' };
    if (endpoint === 'git/commits') return { sha: 'new-head' };
    if (endpoint.startsWith('git/refs/heads/')) {
      if (rejectRef) throw new Error('GitHub rejected non-fast-forward ref update');
      return {};
    }
    throw new Error(`Unexpected endpoint: ${endpoint}`);
  };
  return { api, calls };
}
const entries = [{ path: 'preview/es/index.html', mode: '100644', type: 'blob', content: 'preview' }];
test('publication preserves the base tree and updates only the requested branch without force', async () => {
  const h = apiHarness();
  assert.deepEqual(await publishSnapshot(h.api, 'prototype/03-frequency', entries, 'Update preview'), { sha: 'new-head', changed: true });
  assert.equal(h.calls.find((c) => c.endpoint === 'git/trees').body.base_tree, 'old-tree');
  assert.deepEqual(h.calls.find((c) => c.endpoint === 'git/commits').body.parents, ['old-head']);
  assert.deepEqual(h.calls.at(-1), { endpoint: 'git/refs/heads/prototype/03-frequency', method: 'PATCH', body: { sha: 'new-head', force: false } });
});
test('a concurrent branch update is rejected before a ref mutation', async () => {
  const h = apiHarness({ raced: true });
  await assert.rejects(publishSnapshot(h.api, 'main', entries, 'Update directory'), /changed during publication/);
  assert.equal(h.calls.some((c) => c.method === 'PATCH'), false);
});
test('unchanged snapshots do not create duplicate commits or deployments', async () => {
  const h = apiHarness({ sameTree: true });
  assert.deepEqual(await publishSnapshot(h.api, 'main', entries, 'Update directory'), { sha: 'old-head', changed: false });
  assert.equal(h.calls.some((c) => c.method === 'PATCH' || c.endpoint === 'git/commits'), false);
});
test('a race after the final head check propagates GitHub rejection without a forced retry', async () => {
  const h = apiHarness({ rejectRef: true });
  await assert.rejects(publishSnapshot(h.api, 'main', entries, 'Update directory'), /non-fast-forward/);
  assert.equal(h.calls.filter((c) => c.method === 'PATCH').length, 1);
  assert.equal(h.calls.at(-1).body.force, false);
});

test('deployment waiting selects the published commit and ignores unrelated successful runs', async () => {
  const { waitForDeployment } = await import('../scripts/deployment.mjs');
  let tick = 0;
  const unrelated = { headSha: 'other', status: 'completed', conclusion: 'success', url: 'other-run' };
  const expected = { headSha: 'wanted', status: 'completed', conclusion: 'success', url: 'wanted-run' };
  const result = await waitForDeployment(() => tick === 0 ? [unrelated, { ...expected, status: 'in_progress' }] : [unrelated, expected], 'wanted', { now: () => tick, sleep: async (ms) => { tick += ms; }, intervalMs: 5, timeoutMs: 20 });
  assert.equal(result.url, 'wanted-run');
  assert.equal(tick, 5);
});
test('deployment failure and missing runs stop the release instead of claiming verification', async () => {
  const { waitForDeployment } = await import('../scripts/deployment.mjs');
  await assert.rejects(waitForDeployment(() => [{ headSha: 'wanted', status: 'completed', conclusion: 'failure', url: 'failed-run' }], 'wanted'), /failure: failed-run/);
  let tick = 0;
  await assert.rejects(waitForDeployment(() => [], 'wanted', { now: () => tick, sleep: async (ms) => { tick += ms; }, intervalMs: 5, timeoutMs: 12 }), /Timed out/);
  assert.equal(tick, 12);
});
