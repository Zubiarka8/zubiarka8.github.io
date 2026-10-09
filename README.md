# Frequency prototype

An isolated candidate for `prototype/03-frequency`, based on `base/preconfiguration` commit `71238d76a73b3a2d406cdae434ddd5efa47b292e`. This folder preserves the workspace baseline and other candidates. Its remote branch has not been updated because GitHub integration write access is blocked.

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

## Pending branch publication

`publication/tree.json` contains the complete source/preview update as a GitHub Git tree request, based on the verified baseline. When write access is restored, check that the target branch still has the recorded head before creating the tree and commit. Update only `prototype/03-frequency` with a non-forced ref update. If the branch has changed, inspect its new history and regenerate the request before publication. Do not update `main` or deploy.
