import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { locales, translations } from '../src/i18n/translations.ts';
import { renderFrequency } from '../src/components/renderFrequency.ts';

// Review export using the actual renderer, styles, and enhancement; not an Astro build.
const root = new URL('../preview/', import.meta.url);
const css = (await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'))
  .replace('@import "tailwindcss";', '').replace('@theme {', ':root {');
const source = await readFile(new URL('../src/scripts/frequency.ts', import.meta.url), 'utf8');
const script = stripTypeScriptTypes(source).replace('export function', 'function') + '\nenhanceFrequency();';
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
for (const locale of locales) {
  const text = translations[locale];
  const html = `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escape(text.description)}"><meta name="theme-color" content="#f4f8fa"><title>${escape(text.title)}</title><link rel="icon" href="../favicon.svg"><style>${css}</style></head><body><a href="#main" class="skip-link">${escape(text.skip)}</a>${renderFrequency(locale, true)}<script>${script}</script></body></html>`;
  await mkdir(new URL(`${locale}/`, root), { recursive: true });
  await writeFile(new URL(`${locale}/index.html`, root), html);
}
await writeFile(new URL('index.html', root), '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=es/index.html"><title>Arkaitz Zubizarreta</title></head><body><a href="es/index.html">Español</a><a href="en/index.html">English</a></body></html>');
await writeFile(new URL('favicon.svg', root), await readFile(new URL('../public/favicon.svg', import.meta.url)));
console.log('Exported both Frequency review routes. This is not an Astro production build.');
