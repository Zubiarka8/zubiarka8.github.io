# Repository Guidelines

## Project Structure & Module Organization

This portfolio uses Astro, React, TypeScript, and Tailwind CSS. `src/pages/` contains static locale routes, `src/components/` contains React islands, `src/layouts/` provides shared HTML, `src/i18n/` holds translations, and `src/data/` stores confirmed skills. Static assets live in `public/`, tests in `tests/`, and requirements in `docs/`.

## Build, Test, and Development Commands

Use Node.js 24. Run `npm install` to generate the initial lockfile; use `npm ci` thereafter. `npm run dev` starts development, `npm run check` checks types, `npm run build` generates `dist/`, and `npm run preview` serves the build. Dependency installation and local Git initialization are currently blocked by the environment; report verification limits honestly.

## Coding Style & Naming Conventions

Use two-space indentation, strict TypeScript, descriptive English identifiers, PascalCase component filenames, and stable translation keys. Keep content separate from rendering. No formatter or linter is configured yet.

## Testing Guidelines

Node's test runner executes `tests/*.test.mjs`. `npm test` builds and verifies routes, metadata, sections, sitemap, and translations. `npm run test:translations` runs independently. No coverage threshold is defined.

## Commit & Pull Request Guidelines

Use concise, imperative English commit subjects. PRs should explain behavior, link relevant issues, report validation, and include screenshots for visual changes when available. Target `Zubiarka8/zubiarka8.github.io`; deployment uses GitHub Actions and base path `/`.

## Design Identity

Build a distinctive, personal, memorable portfolio. The current starter is provisional. Before redesigning, document a concept rooted in the owner's real interests and projects, deliberate typography and color, and one signature interaction or visual element. Explain how these choices express the owner's personality. Avoid default templates, copied branding, invented achievements, and effects without a purpose. Preserve mobile usability, keyboard access, contrast, reduced motion, and complete Spanish/English content.

## Local Skills

For visual direction, read `skills/frontend-design/SKILL.md`; for implementation, use `skills/frontend-ui-engineering/SKILL.md`. Consult `skills/ui-ux-pro-max/SKILL.md` for focused design questions. If GSAP is justified, read `skills/gsap-core/SKILL.md` and `skills/gsap-performance/SKILL.md`. See `skills/README.md` for the full index. These local copies require explicit file reads; they are not automatically discovered skills.

Keep `frontend-design` as the primary visual guide. Use `skills/prototype/SKILL.md` only when explicitly asked to compare design variants; keep exploration separate until the owner selects a variant. Use `skills/copywriting/SKILL.md` for factual, personal website copy in both locales. Use `skills/emil-design-eng/SKILL.md` to refine interactions within the chosen identity. Load only relevant skills; the owner's brief and repository accessibility, language, and Chrome restrictions take precedence.

## Agent-Specific Instructions

Use English for project code, identifiers, comments, documentation, test descriptions, commit messages, and pull request descriptions. Communicate with the user in Spanish (Castilian). Public website content must support both Spanish (`es`) and English (`en`); localized content is an intentional exception to the English project language.

Use Chrome tools or browser automation through Chrome only with explicit authorization for the current task. Do not consult global skills unless the user explicitly requests them. Follow additional project instructions as they are introduced.
