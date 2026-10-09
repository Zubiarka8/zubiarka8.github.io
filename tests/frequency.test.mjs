import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import vm from 'node:vm';
import test from 'node:test';
import { renderFrequency } from '../src/components/renderFrequency.ts';
import { signalSections } from '../src/data/signal.ts';
import { expertise } from '../src/data/expertise.ts';

for (const locale of ['es', 'en']) {
  test(`${locale} renderer preserves content, accessible references, and static fallback`, async () => {
    const html = renderFrequency(locale, true);
    const preview = await readFile(new URL(`../preview/${locale}/index.html`, import.meta.url), 'utf8');
    assert.ok(preview.includes(html));
    assert.ok(preview.includes(`<html lang="${locale}">`));
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const section of signalSections) assert.ok(ids.includes(section));
    for (const match of html.matchAll(/href="#([^"]+)"|aria-labelledby="([^"]+)"/g)) {
      for (const id of (match[1] ?? match[2]).split(' ')) assert.ok(ids.includes(id), id);
    }
    for (const items of Object.values(expertise)) for (const item of items) assert.ok(html.includes(item));
    assert.doesNotMatch(html, /id="contact"|href="#contact"|<button/);
    assert.match(html, /class="current-section" hidden/);
    assert.match(html, /https:\/\/github.com\/Zubiarka8\/mini-consumes-tokens/);
    for (const language of ['es', 'en']) assert.ok(html.includes(`href="../${language}/index.html"`));
    assert.equal((html.match(/data-signal-path=/g) ?? []).length, 7);
  });
}

const source = await readFile(new URL('../src/scripts/frequency.ts', import.meta.url), 'utf8');
const executable = stripTypeScriptTypes(source).replace('export function', 'function') + '\nenhanceFrequency();';
function harness(desktop = true, initialHash = '') {
  class Element {
    constructor(id = '', dataset = {}) { this.id = id; this.dataset = dataset; this.attributes = {}; this.events = {}; this.classes = new Set(); this.classList = { toggle: (name, enabled) => enabled ? this.classes.add(name) : this.classes.delete(name) }; }
    setAttribute(name, value) { this.attributes[name] = value; }
    removeAttribute(name) { delete this.attributes[name]; }
    addEventListener(name, callback) { this.events[name] = callback; }
    closest(selector) {
      if (selector === '[data-signal-section]') return this.section ?? null;
      if (selector === '[data-section-link]') return this.dataset.sectionLink ? this : null;
      if (selector === 'a[href^="#"]') return this.hash ? this : null;
      return null;
    }
  }
  const sections = signalSections.map((id) => new Element(id, { sectionLabel: `Label ${id}` }));
  const links = sections.slice(1).map((section) => Object.assign(new Element('', { sectionLink: section.id }), { hash: `#${section.id}` }));
  const paths = sections.map((section) => new Element('', { signalPath: section.id }));
  const label = new Element();
  const status = Object.assign(new Element(), { hidden: true });
  const languages = [new Element(), new Element()];
  const root = new Element();
  root.querySelectorAll = (selector) => ({ '[data-signal-section]': sections, '[data-section-link]': links, '[data-signal-path]': paths, '[data-language]': languages })[selector];
  root.querySelector = (selector) => selector === '.current-section' ? status : label;
  let observation;
  class IntersectionObserver {
    constructor(callback) { observation = callback; }
    observe() {}
  }
  const events = {};
  const window = { location: { hash: initialHash }, matchMedia: () => ({ matches: desktop }), IntersectionObserver, addEventListener: (name, callback) => { events[name] = callback; } };
  vm.runInNewContext(executable, { document: { querySelector: () => root }, window, Element, IntersectionObserver });
  return { Element, root, sections, links, paths, label, status, languages, events, window, observation };
}
function assertActive(h, id) {
  assert.equal(h.label.textContent, `Label ${id}`);
  assert.deepEqual(h.sections.filter((section) => section.dataset.signalActive === 'true').map((section) => section.id), [id]);
  assert.deepEqual(h.paths.filter((path) => path.classes.has('is-active')).map((path) => path.dataset.signalPath), [id]);
  assert.deepEqual(h.links.filter((link) => link.attributes['aria-current']).map((link) => link.dataset.sectionLink), id === 'introduction' ? [] : [id]);
}
test('navigation, section focus, scrolling, and locale changes keep one coherent selected section', () => {
  const h = harness();
  assertActive(h, 'introduction');
  assert.equal(h.status.hidden, false);
  for (const link of h.links) {
    h.root.events.click({ target: link });
    assertActive(h, link.dataset.sectionLink);
    h.root.events.focusin({ target: link });
    assertActive(h, link.dataset.sectionLink);
  }
  const sourceLink = new h.Element();
  sourceLink.section = h.sections[1];
  h.root.events.focusin({ target: sourceLink });
  assertActive(h, 'projects');
  h.observation([{ isIntersecting: true, target: h.sections[2], boundingClientRect: { top: 80 } }]);
  assertActive(h, 'about');
  h.window.location.hash = '#tools';
  h.events.hashchange();
  assertActive(h, 'tools');
  h.languages[1].events.click();
  assert.equal(h.languages[1].hash, '#tools');
});
test('compact layout supports deep links and native navigation without an observer', () => {
  const h = harness(false, '#experience');
  assert.equal(h.observation, undefined);
  assertActive(h, 'experience');
  h.window.location.hash = '#unknown';
  h.events.hashchange();
  assertActive(h, 'experience');
  const fallback = harness(false, '#unknown');
  assertActive(fallback, 'introduction');
});
