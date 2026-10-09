import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

for (const locale of ['es', 'en']) {
  test(`${locale} page has localized metadata and complete navigation`, async () => {
    const html = await readFile(new URL(`../dist/${locale}/index.html`, import.meta.url), 'utf8');
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.match(html, new RegExp(`rel="canonical" href="https://zubiarka8.github.io/${locale}/"`));
    for (const language of ['es', 'en']) {
      assert.match(html, new RegExp(`hreflang="${language}" href="https://zubiarka8.github.io/${language}/"`));
      assert.match(html, new RegExp(`href="/${language}/"`));
    }
    for (const section of ['about', 'experience', 'languages', 'tools', 'ai', 'projects']) {
      assert.match(html, new RegExp(`id="${section}"`));
    }
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.doesNotMatch(html, /id="contact"|href="#contact"/);
    assert.equal((html.match(/id="featured-project-title"/g) ?? []).length, 1);
    assert.ok(html.includes('Arkaitz Zubizarreta'));
    assert.ok(html.includes('https://github.com/Zubiarka8/mini-consumes-tokens'));
    assert.match(html, /href="#main"/);
    assert.ok(html.includes(locale === 'es' ? 'Saltar al contenido' : 'Skip to content'));
    assert.ok(html.includes(locale === 'es' ? 'Ver proyectos' : 'View projects'));
  });
}

test('root directs visitors to the Spanish version', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.match(html, /url=\/es\//i);
});

test('sitemap contains both language versions', async () => {
  const sitemap = await readFile(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8');
  assert.ok(sitemap.includes('https://zubiarka8.github.io/es/'));
  assert.ok(sitemap.includes('https://zubiarka8.github.io/en/'));
});
