# Portfolio Prototype Branches

## Shared Starting Point

`base/preconfiguration` preserves the bilingual Astro/React/TypeScript/Tailwind starter, confirmed personal content, tests, local skills, and project documentation. It is a technical baseline, not a finished design. All prototype branches initially point to the same baseline commit.

| Branch | Direction | Initial status |
| --- | --- | --- |
| `prototype/01-connections` | An interactive code/technology relationship map rooted in the MCP project. | Concept defined; design not implemented. |
| `prototype/02-idea-to-code` | A narrative about the path from a problem to a working tool. | Concept defined; design not implemented. |
| `prototype/03-frequency` | A personal graphic signal responding to content and interaction. | Concept defined; design not implemented. |
| `prototype/04-exploration` | A fourth direction to define with the owner. | Reserved; concept and design pending. |

## Comparison Rules

Keep confirmed content, both locales, hidden contact, and accessibility requirements consistent. Differentiate composition, visual identity, navigation, and meaningful interactions rather than merely changing colors. Every prototype must adapt to phones, tablets, and desktop screens. Use original assets and project-specific visual language.

Build each prototype only in its own branch. Record its concept, dependency choices, working interactions, validation, and limitations. Do not merge competing layouts together. After the owner chooses, integrate the selected design into `main`; keep the baseline available for reference.

## Development and Preview

After cloning the repository, select a branch with `git switch prototype/01-connections`, install dependencies, and use `npm run dev`. Use `npm run check` and `npm test` before presenting a prototype. Branches alone do not provide public preview URLs; a separate preview arrangement can be added when designs exist.

GitHub Pages deployment is restricted to `main`, including manual workflow runs. Publishing a prototype branch does not publish its website. No prototype design is selected or deployed during this setup.

## Baseline Verification Limits

Translation tests pass locally. Dependency installation fails with `ENOTFOUND registry.npmjs.org`, so the initial baseline has no lockfile and its build, type checks, and generated-site tests remain unverified. Resolve installation, commit a lockfile, and complete those checks before deploying the chosen design.
