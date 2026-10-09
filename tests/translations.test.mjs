import assert from 'node:assert/strict';
import test from 'node:test';
import { locales, translations } from '../src/i18n/translations.ts';

function leafKeys(value, prefix = '') {
  return Object.entries(value).flatMap(([key, entry]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof entry === 'object' ? leafKeys(entry, path) : [path];
  }).sort();
}

test('both languages have the same translation keys', () => {
  assert.deepEqual(locales, ['es', 'en']);
  assert.deepEqual(leafKeys(translations.es), leafKeys(translations.en));
});

test('all translations contain nonempty text', () => {
  function verify(value) {
    for (const entry of Object.values(value)) {
      if (typeof entry === 'object') verify(entry);
      else assert.ok(typeof entry === 'string' && entry.trim().length > 0);
    }
  }
  for (const locale of locales) verify(translations[locale]);
});
