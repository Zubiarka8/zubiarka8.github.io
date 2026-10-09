import { spawnSync } from 'node:child_process';
import { readdir, readFile, lstat } from 'node:fs/promises';
import path from 'node:path';

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed: ${result.stderr || result.stdout || `exit status ${result.status}`}`);
  return result.stdout;
}

export function github(repository) {
  return (endpoint, method = 'GET', body) => {
    const args = ['api', `repos/${repository}/${endpoint}`, '--method', method];
    if (body) args.push('--input', '-');
    return JSON.parse(run('gh', args, { input: body ? JSON.stringify(body) : undefined }));
  };
}

export function validateConfig(config) {
  if (config.repository !== 'Zubiarka8/zubiarka8.github.io' || config.siteUrl !== 'https://zubiarka8.github.io') throw new Error('Unexpected publication destination.');
  const seen = new Set();
  for (const item of config.prototypes) {
    if (!/^[0-9]{2}-[a-z0-9-]+$/.test(item.slug) || seen.has(item.slug)) throw new Error('Invalid or duplicate prototype slug.');
    if (!/^prototype\/[a-z0-9-]+$/.test(item.branch)) throw new Error('Prototype must use an isolated prototype branch.');
    if (item.revision !== null && !/^[a-f0-9]{40}$/.test(item.revision)) throw new Error('Preview revision must be a complete commit SHA.');
    for (const key of ['name', 'es', 'en']) if (typeof item[key] !== 'string' || !item[key].trim()) throw new Error(`Missing ${key} for ${item.slug}.`);
    seen.add(item.slug);
  }
  return config;
}

export async function filesUnder(directory) {
  const stat = await lstat(directory);
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`Expected a regular directory: ${directory}`);
  const files = [];
  for (const name of (await readdir(directory)).sort()) {
    const file = path.join(directory, name);
    const stat = await lstat(file);
    if (stat.isSymbolicLink()) throw new Error(`Symlinks are not published: ${file}`);
    if (stat.isDirectory()) files.push(...await filesUnder(file));
    else if (stat.isFile()) files.push(file);
  }
  return files;
}

export function validateHtml(html, locale, label) {
  if (!new RegExp(`<html\\s+lang="${locale}"`).test(html)) throw new Error(`Wrong language: ${label}`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) throw new Error(`Expected one h1: ${label}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate IDs: ${label}`);
  for (const match of html.matchAll(/(?:href="#|aria-labelledby=")([^"]+)"/g)) {
    for (const id of match[1].split(' ')) if (!ids.includes(id)) throw new Error(`Missing anchor or label ${id}: ${label}`);
  }
  if (/id="contact"|href="#contact"/.test(html)) throw new Error(`Disabled contact is present: ${label}`);
}

export async function validateSite(root, config) {
  const expected = ['index.html', 'es/index.html', 'en/index.html', ...config.prototypes.filter((p) => p.revision).flatMap((p) => ['es', 'en'].map((locale) => `prototypes/${p.slug}/${locale}/index.html`))];
  for (const relative of expected) {
    const file = path.join(root, relative);
    const html = await readFile(file, 'utf8');
    validateHtml(html, relative.includes('/en/') || relative === 'en/index.html' ? 'en' : 'es', relative);
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = match[1];
      if (href.startsWith('#') || /^(?:https?:|data:|mailto:)/.test(href)) continue;
      const url = new URL(href, `https://local.invalid/${relative}`);
      if (url.origin !== 'https://local.invalid') throw new Error(`Unexpected external asset: ${href}`);
      let target = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
      if (target !== root && !target.startsWith(`${root}${path.sep}`)) throw new Error(`Link escapes site: ${href}`);
      if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
      if (!(await lstat(target)).isFile()) throw new Error(`Missing local destination: ${relative}: ${href}`);
    }
  }
  for (const locale of ['es', 'en']) {
    const html = await readFile(path.join(root, locale, 'index.html'), 'utf8');
    for (const item of config.prototypes) {
      const linked = html.includes(`/prototypes/${item.slug}/es/`) && html.includes(`/prototypes/${item.slug}/en/`);
      if (Boolean(item.revision) !== linked) throw new Error(`Directory availability mismatch: ${item.slug}`);
    }
  }
  return expected;
}

// Re-read the branch immediately before updating it. A non-forced update also
// rejects races after this check, because the new commit descends from the old head.
export async function publishSnapshot(api, branch, entries, message) {
  const ref = `git/refs/heads/${branch}`;
  const head = api(`git/ref/heads/${branch}`).object.sha;
  const current = api(`git/commits/${head}`);
  const tree = api('git/trees', 'POST', { base_tree: current.tree.sha, tree: entries });
  if (tree.sha === current.tree.sha) return { sha: head, changed: false };
  const commit = api('git/commits', 'POST', { message, tree: tree.sha, parents: [head] });
  if (api(`git/ref/heads/${branch}`).object.sha !== head) throw new Error(`Branch ${branch} changed during publication. Refresh and retry; nothing was overwritten.`);
  api(ref, 'PATCH', { sha: commit.sha, force: false });
  return { sha: commit.sha, changed: true };
}

export async function treeEntries(root, files, api) {
  const entries = [];
  for (const file of files) {
    const bytes = await readFile(file);
    const entry = { path: path.relative(root, file).split(path.sep).join('/'), mode: '100644', type: 'blob' };
    const text = bytes.toString('utf8');
    if (Buffer.from(text).equals(bytes)) entry.content = text;
    else {
      if (!api) throw new Error(`Binary file requires GitHub blob upload: ${entry.path}`);
      entry.sha = api('git/blobs', 'POST', { content: bytes.toString('base64'), encoding: 'base64' }).sha;
    }
    entries.push(entry);
  }
  return entries;
}
