# Frequency prototype

An isolated candidate for `prototype/03-frequency`, based on `base/preconfiguration` commit `71238d76a73b3a2d406cdae434ddd5efa47b292e`. This folder preserves the workspace baseline and other candidates. Its source and bilingual exports are saved on the remote branch at commit ccf0cbc18b1023ffccee82a19a16a6fa4a16a635.

Use Node.js 24. Run commands inside this folder:

```sh
npm install
npm run dev
npm run check
npm test
npm run test:translations
node --experimental-strip-types scripts/export-preview.mjs
node --experimental-strip-types --test tests/frequency.test.mjs tests/translations.test.mjs
```

Open [Spanish review export](preview/es/index.html) or [English review export](preview/en/index.html) locally. These self-contained pages share the actual renderer, styles, data, and interaction script. They do not verify an Astro production build. Dependencies are unavailable due to registry DNS failure.

Read [design decisions and validation](docs/prototype-03-frequency.md). Contact is disabled. No production deployment or final design selection is authorized.

## Published previews

- Directory: https://zubiarka8.github.io/
- Spanish: https://zubiarka8.github.io/prototypes/03-frequency/es/
- English: https://zubiarka8.github.io/prototypes/03-frequency/en/

Publication of these review exports was explicitly authorized by the owner. Frequency remains an isolated candidate; no final portfolio design has been selected.
