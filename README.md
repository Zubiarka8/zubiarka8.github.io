# Prototype 02: From Idea to Code

Isolated local candidate for `prototype/02-idea-to-code`. The top-level starter and prototype 01 are preserved. On the remote branch, this folder's application files are stored at repository root, based on `base/preconfiguration`.

Use Node.js 24. Install dependencies with `npm install`, then run `npm run check`, `npm test`, and `npm run test:translations`. Dependency installation is currently blocked by DNS; no Astro build is claimed.

`node --experimental-strip-types scripts/export-preview.mjs` creates a dependency-free standalone review export at `preview/es/index.html` and `preview/en/index.html`. It shares CSS, data, translations, and selection rules with the application, but uses a separate HTML renderer and DOM enhancement. It does not validate React hydration or Astro compilation.

See [design decisions and verification](docs/prototype-02-idea-to-code.md). No final design is selected, merged, or deployed by this candidate.
