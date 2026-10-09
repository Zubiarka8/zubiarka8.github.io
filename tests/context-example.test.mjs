import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';
import { selectExampleLines } from '../src/data/context-example.ts';

test('focused context includes the definition and dependency with original locations', () => {
  const selected = selectExampleLines('focused');
  assert.deepEqual(selected.map((line) => line.number), [2, 4, 5, 6]);
  assert.match(selected.map((line) => line.code).join('\n'), /const taxRate = 0.21;[\s\S]*export function calculateTotal/);
  assert.doesNotMatch(selected.map((line) => line.code).join('\n'), /formatPrice|invoiceLabel|const currency/);
  const full = selectExampleLines('full');
  assert.equal(full.length, 14);
  assert.deepEqual(full.filter((line) => line.relevant), selected);
});

test('standalone controls update selection and restore the full file, including keyboard input', async () => {
  const listeners = new Map();
  const buttons = ['full', 'focused'].map((view) => {
    const marker = { textContent: view === 'full' ? '●' : '○' };
    return { dataset: { view }, marker, textContent: `○ ${view}`, pressed: view === 'full',
      addEventListener(event, handler) { listeners.set(`${view}:${event}`, handler); },
      setAttribute(name, value) { if (name === 'aria-pressed') this.pressed = value === 'true'; },
      querySelector() { return marker; },
    };
  });
  const lines = selectExampleLines('full').map((line) => ({ dataset: { relevant: String(line.relevant) }, hidden: false }));
  const controls = { hidden: true };
  const status = { dataset: { full: 'All lines', focused: 'Selected context' }, textContent: 'All lines' };
  const label = { textContent: 'full' };
  const comparison = { dataset: {},
    querySelector(selector) { return { '.comparison-controls': controls, '.comparison-status': status, '[data-view-label]': label }[selector]; },
    querySelectorAll(selector) { return selector === '[data-view]' ? buttons : lines; },
  };
  const document = { querySelectorAll(selector) { return selector === '[data-comparison]' ? [comparison] : []; } };
  vm.runInNewContext(await readFile(new URL('../scripts/preview-interaction.js', import.meta.url), 'utf8'), { document });
  assert.equal(controls.hidden, false);
  listeners.get('focused:keydown')();
  assert.equal(comparison.dataset.keyboard, 'true');
  listeners.get('focused:click')({ detail: 0 });
  assert.equal(lines.filter((line) => !line.hidden).length, 4);
  assert.deepEqual(buttons.map((button) => button.pressed), [false, true]);
  assert.equal(status.textContent, 'Selected context');
  assert.equal(label.textContent, 'focused');
  assert.equal(buttons[1].marker.textContent, '●');
  listeners.get('full:pointerdown')();
  assert.equal(comparison.dataset.keyboard, 'false');
  listeners.get('full:click')({ detail: 1 });
  assert.equal(lines.filter((line) => !line.hidden).length, 14);
  assert.deepEqual(buttons.map((button) => button.pressed), [true, false]);
  assert.equal(status.textContent, 'All lines');
});
