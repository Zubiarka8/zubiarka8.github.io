# Personal Portfolio

Personal portfolio for Arkaitz Zubizarreta (`zubiarka8`), with Spanish and English content, focused on work opportunities and showcasing projects.

## Repository and Hosting

- Repository: [Zubiarka8/zubiarka8.github.io](https://github.com/Zubiarka8/zubiarka8.github.io)
- Intended website URL: `https://zubiarka8.github.io/`
- Default branch: `main`
- Hosting: GitHub Pages, with deployment through GitHub Actions.
- Site base path: `/`, without a `/portfolio/` prefix.

The starter uses Astro, React, TypeScript, and Tailwind CSS. Astro generates static Spanish and English pages; the language selector is a React component. Tailwind uses its Vite plugin. Initial personal content is present; the final visual direction remains pending.

## Development

Use Node.js 24 (see `.nvmrc`). Install dependencies with `npm install` and commit the generated `package-lock.json` before deploying. Subsequent clean installations should use `npm ci`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run check` | Check Astro and TypeScript diagnostics. |
| `npm run build` | Generate the static site in `dist/`. |
| `npm run preview` | Preview the production output locally. |
| `npm test` | Build and check language routes, metadata, sections, sitemap, and translations. |
| `npm run test:translations` | Check translation completeness without installing dependencies. |

Pages are available at `/es/` and `/en/`; `/` redirects to Spanish. Edit copy in `src/i18n/translations.ts`, identity/project/contact settings in `src/data/profile.ts`, the page structure in `src/pages/[locale]/index.astro`, and shared styling in `src/styles/global.css`. Contact is disabled until an approved public destination is supplied.

The workflow in `.github/workflows/deploy.yml` checks types, builds, tests, and deploys on pushes to `main`. Manual deployment is also restricted to `main`. Dependencies and the lockfile must be installed before it can run. The starter is saved on `base/preconfiguration` and used as the starting point for four prototype branches. See [the prototype branch guide](docs/prototype-branches.md). Final publication remains pending.

## Project Requirements

The website presents a biography, a three-month web-development internship, technologies, development tools, AI tools, and the featured `mini-consumes-tokens` MCP project. See [the project brief](docs/portfolio-brief.md) and [ten visual references](docs/visual-references.md).

Use English for project code, comments, documentation, tests, commits, and pull request descriptions. Communicate with the owner in Spanish. Public website content must support both Spanish and English.

## Local Setup Status

This workspace currently prevents creating `.git`. Local Git initialization, the `origin` remote, and synchronization of the existing local files are pending. Once filesystem permissions allow Git metadata, connect this folder to the repository without overwriting its remote history.

The remote `main` branch contains the earlier initial README; the baseline and prototype branches preserve this history and add the local starter through the GitHub Git API. Dependency installation in this workspace failed with `ENOTFOUND registry.npmjs.org`. Compilation, type checks, and generated-site tests remain unverified until installation succeeds. Translation tests can run independently.
