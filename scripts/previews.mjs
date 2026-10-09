import { readFile, writeFile, mkdir, mkdtemp, cp, rm, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { buildHub } from './build-hub.mjs';
import { run, github, validateConfig, validateHtml, validateSite, filesUnder, publishSnapshot, treeEntries } from './preview-tools.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const site = path.join(root, 'site');
const configPath = path.join(root, 'prototypes.json');
const config = validateConfig(JSON.parse(await readFile(configPath, 'utf8')));
const [requestedCommand = 'help', ...args] = process.argv.slice(2);
const command = requestedCommand === '--help' ? 'help' : requestedCommand;
const usage = `Preview automation (Node.js 24, gh authenticated for publication)
  node scripts/previews.mjs build
  node scripts/previews.mjs check
  node scripts/previews.mjs export <slug> [--source <folder>]
  node scripts/previews.mjs refresh [<slug>]
  node scripts/previews.mjs publish-prototype <slug> [--source <folder>]
  node scripts/previews.mjs publish-hub
  node scripts/previews.mjs verify

build/check/export are local. refresh reads GitHub and updates local exports.
publish-prototype writes only its configured candidate branch and refreshes its
local hub copy. publish-hub writes main and triggers the Pages workflow.
verify compares every published HTML page with the local export.
Run from prototype-hub, or use the full script path from any directory.`;

async function build() { await buildHub(config, site); }
function select(slug) {
  const item = config.prototypes.find((p) => p.slug === slug);
  if (!item) throw new Error(`Unknown prototype: ${slug ?? '(missing)'}`);
  return item;
}
function sourceFor(item, options) {
  if (options.length && (options.length !== 2 || options[0] !== '--source')) throw new Error('Expected --source <folder>.');
  return options.length ? path.resolve(options[1]) : path.resolve(root, '../prototypes', item.slug);
}
async function exportPreview(item, source) {
  run(process.execPath, ['--experimental-strip-types', 'scripts/export-preview.mjs'], { cwd: source, stdio: 'inherit' });
  const tests = (await filesUnder(path.join(source, 'tests'))).filter((file) => file.endsWith('.test.mjs') && path.basename(file) !== 'site.test.mjs');
  if (tests.length) run(process.execPath, ['--experimental-strip-types', '--test', ...tests], { cwd: source, stdio: 'inherit' });
  for (const locale of ['es', 'en']) validateHtml(await readFile(path.join(source, 'preview', locale, 'index.html'), 'utf8'), locale, item.slug);
}
async function refresh(items, api, pinnedSha) {
  const staged = await mkdtemp(path.join(tmpdir(), 'portfolio-previews-'));
  const revisions = new Map();
  try {
    // Stage every download before changing the manifest or published copies.
    for (const item of items) {
      const revision = pinnedSha ?? api(`git/ref/heads/${item.branch}`).object.sha;
      for (const file of ['es/index.html', 'en/index.html', 'favicon.svg']) {
        const response = api(`contents/preview/${file}?ref=${revision}`);
        if (response.encoding !== 'base64' || typeof response.content !== 'string') throw new Error(`Unsupported GitHub content: ${item.slug}/${file}`);
        const content = Buffer.from(response.content.replace(/\s/g, ''), 'base64');
        if (file.endsWith('.html')) validateHtml(content.toString('utf8'), file.startsWith('es') ? 'es' : 'en', item.slug);
        const destination = path.join(staged, item.slug, file);
        await mkdir(path.dirname(destination), { recursive: true });
        await writeFile(destination, content);
      }
      revisions.set(item.slug, revision);
    }
    const nextConfig = structuredClone(config);
    const nextSite = path.join(staged, 'site');
    await cp(site, nextSite, { recursive: true });
    for (const item of items) {
      await cp(path.join(staged, item.slug), path.join(nextSite, 'prototypes', item.slug), { recursive: true });
      nextConfig.prototypes.find((p) => p.slug === item.slug).revision = revisions.get(item.slug);
    }
    await buildHub(nextConfig, nextSite);
    await validateSite(nextSite, nextConfig);
    // Downloads and all generated navigation are checked before replacing files.
    await cp(nextSite, site, { recursive: true });
    Object.assign(config, nextConfig);
    await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');
  } finally { await rm(staged, { recursive: true, force: true }); }
}
async function candidateFiles(source) {
  const files = [];
  for (const directory of ['src', 'public', 'tests', 'scripts', 'docs', 'preview']) files.push(...await filesUnder(path.join(source, directory)));
  for (const file of ['README.md', 'package.json', 'package-lock.json', 'astro.config.mjs', 'tsconfig.json', '.nvmrc']) {
    const target = path.join(source, file);
    try {
      if (!(await lstat(target)).isFile()) throw new Error(`Expected regular file: ${target}`);
      files.push(target);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return files;
}
try {
  switch (command) {
    case 'help': if (args.length) throw new Error('Unexpected arguments.'); console.log(usage); break;
    case 'build': if (args.length) throw new Error('Unexpected arguments.'); await build(); await validateSite(site, config); console.log('Directory built and validated.'); break;
    case 'check': if (args.length) throw new Error('Unexpected arguments.'); console.log(`Validated ${(await validateSite(site, config)).length} local HTML pages.`); break;
    case 'export': { const item = select(args[0]); await exportPreview(item, sourceFor(item, args.slice(1))); break; }
    case 'refresh': {
      if (args.length > 1) throw new Error('Expected at most one slug.');
      const items = args.length ? [select(args[0])] : config.prototypes.filter((p) => p.revision);
      await refresh(items, github(config.repository)); console.log('Refreshed pinned exports and directory.'); break;
    }
    case 'publish-prototype': {
      const item = select(args[0]); const source = sourceFor(item, args.slice(1));
      await exportPreview(item, source);
      const api = github(config.repository);
      const entries = await treeEntries(source, await candidateFiles(source), api);
      const result = await publishSnapshot(api, item.branch, entries, `Update ${item.slug} source and bilingual review exports`);
      console.log(`Saved candidate revision: ${result.sha}`);
      await refresh([item], api, result.sha);
      console.log(`${config.siteUrl}/prototypes/${item.slug}/es/ (publish-hub updates the public copy)`);
      console.log(`https://rawcdn.githack.com/${config.repository}/${result.sha}/preview/es/index.html`);
      console.log(`https://rawcdn.githack.com/${config.repository}/${result.sha}/preview/en/index.html`);
      break;
    }
    case 'publish-hub': {
      if (args.length) throw new Error('Unexpected arguments.');
      await build(); await validateSite(site, config);
      const api = github(config.repository);
      const files = [configPath, path.join(root, 'package.json')];
      for (const dir of ['site', 'scripts', 'tests', 'docs', '.github']) files.push(...await filesUnder(path.join(root, dir)));
      const result = await publishSnapshot(api, 'main', await treeEntries(root, files, api), 'Update prototype directory and preview automation');
      console.log(`${result.changed ? 'Published' : 'Already current'}: ${result.sha}\n${config.siteUrl}/`);
      console.log('Check the Pages workflow before running verify.');
      break;
    }
    case 'verify': {
      if (args.length) throw new Error('Unexpected arguments.');
      const pages = await validateSite(site, config);
      for (const page of pages) {
        const url = `${config.siteUrl}/${page.replace(/index\.html$/, '')}`;
        const response = await fetch(url, { signal: AbortSignal.timeout(20000), cache: 'no-store' });
        if (!response.ok) throw new Error(`${response.status}: ${url}`);
        const actual = Buffer.from(await response.arrayBuffer());
        if (!actual.equals(await readFile(path.join(site, page)))) throw new Error(`Published content differs: ${url}. Check deployment completion.`);
        console.log(`Verified ${url}`);
      }
      break;
    }
    default: throw new Error(`Unknown command: ${command}\n${usage}`);
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
