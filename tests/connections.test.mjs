import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import { relationshipIds, relationshipItems } from '../src/data/connections.ts';
import { translations } from '../src/i18n/translations.ts';

const source = await readFile(new URL('../src/components/RelationshipExplorer.astro', import.meta.url), 'utf8');
const script = source.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'The relationship explorer includes its progressive enhancement');

function mountExplorer() {
  const panels = relationshipIds.map((id) => ({ dataset: { panel: id }, hidden: false }));
  const controls = relationshipIds.map((id) => {
    const labels = { '[data-selected]': { hidden: true }, '[data-select]': { hidden: false } };
    return {
      dataset: { group: id }, hidden: true, attributes: {}, labels,
      setAttribute(name, value) { this.attributes[name] = value; },
      querySelector(selector) { return labels[selector]; },
      addEventListener(name, handler) { this[name] = handler; },
    };
  });
  const explorer = {
    dataset: {},
    classList: { add(value) { assert.equal(value, 'is-interactive'); } },
    querySelectorAll(selector) { return selector === '[data-group]' ? controls : panels; },
  };
  runInNewContext(stripTypeScriptTypes(script), {
    document: { querySelectorAll() { return [explorer]; } },
  });
  return { panels, controls, explorer };
}

test('enhancement opens one panel and exposes every native control', () => {
  const { panels, controls } = mountExplorer();
  assert.equal(panels.filter((panel) => !panel.hidden).length, 1);
  assert.equal(panels.find((panel) => !panel.hidden).dataset.panel, 'knowledge');
  assert.ok(controls.every((control) => !control.hidden));
  assert.equal(controls[0].attributes['aria-pressed'], 'true');
});

test('every group activation updates content, pressed state, and selected text', () => {
  const { panels, controls, explorer } = mountExplorer();
  for (const control of [...controls].reverse()) {
    control.click();
    assert.equal(explorer.dataset.active, control.dataset.group);
    assert.equal(controls.filter((entry) => entry.attributes['aria-pressed'] === 'true').length, 1);
    assert.equal(control.attributes['aria-pressed'], 'true');
    assert.equal(control.labels['[data-selected]'].hidden, false);
    assert.equal(control.labels['[data-select]'].hidden, true);
    assert.deepEqual(panels.filter((panel) => !panel.hidden).map((panel) => panel.dataset.panel), [control.dataset.group]);
  }
});

test('each confirmed relationship has content in both locales', () => {
  for (const id of relationshipIds) {
    assert.ok(relationshipItems[id].length > 0);
    for (const locale of ['es', 'en']) {
      const group = translations[locale].connections.groups[id];
      assert.ok(group.title && group.summary && group.description);
    }
  }
});
