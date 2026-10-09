# Prototype 01: Connections

## Concept and design contract

The audience is recruiters and people reviewing Arkaitz Zubizarreta's work. The primary action is opening the source and documentation of `mini-consumes-tokens`. A relationship composition places the real project between the author's knowledge, development tools, and AI tools. This reflects his confirmed interest in technology and innovation and the project's work with code relationships. Connections around personal skills are explicitly conceptual; the project's own stack is identified separately.

Use a pale blue working surface rather than a dashboard, a central deep-blue project sheet, and curved SVG connectors. The name has a compact, heavy typographic treatment while body text stays quiet and readable. Only the map receives an expressive composition; ordinary biography, internship, and skills sections remain easy to scan.

Palette: surface `#edf3fa`, ink `#152b48`, secondary text `#52647a`, connection blue `#204fa6`, paper `#ffffff`, highlight `#cfe3ff`. Arial Black with Arial/Helvetica fallbacks carries the name; Trebuchet MS with Arial fallbacks carries body text. These local font stacks avoid remote requests and render immediately; exact appearance varies by operating system.

Desktop structure:

```
name + introduction                        language / navigation
knowledge group        featured MCP project           AI group
development tools      featured MCP project           project stack
                  selected relationship description
biography                             internship
complete technology, development tool, and AI sections
```

Plan review: a freely draggable graph would obscure professional content and require a graph runtime. Four fixed, semantic controls explain the relationships with a corresponding text panel. Unlike a generic node dashboard, the central sheet contains the actual project name, purpose, stack, and repository action. No proficiency meters or invented project statistics appear.

## Implementation and dependencies

Astro produces both locales, Tailwind remains configured, and the existing React language island preserves the current section when switching languages. The relationship explorer uses native HTML buttons and a small Astro script. No animation, graph, or 3D dependency is added. Decorative SVG connectors never handle navigation.

Without JavaScript, all relationship descriptions and confirmed items remain visible and the inactive controls are hidden. With JavaScript, selecting a button changes its pressed state and reveals the corresponding live text panel without moving focus. Enter, Space, click, and touch use the same native button behavior. The selected control has a textual marker as well as a color change.

Phones use a single vertical sequence with the project first, group controls next, and description panels last. Tablet layouts reduce gaps; desktop uses three columns. Grid children allow shrinking, long identifiers wrap, connectors stay inside their container, and all content uses natural document scrolling. Reduced motion disables smooth scrolling and small control transitions; there is no automatic animation.

## Workspace and preview publication

The supplied local workspace has no `.git` directory. The implementation was prepared in `prototypes/01-connections/` to preserve the starter. GitHub API checks confirmed that `prototype/01-connections` and `base/preconfiguration` initially shared commit `71238d76a73b3a2d406cdae434ddd5efa47b292e`.

The candidate source and standalone preview are published together on `prototype/01-connections` through GitHub's Git data API. `main`, the baseline, competing branches, and the GitHub Pages deployment are unchanged. The standalone HTML can be served through raw.githack.com for review; this is a visual export, not a verified Astro production build.

## Validation

Validation results are recorded after implementation below. Browser interaction, screenshots, and actual viewport measurements require an available authorized browser environment. Chrome was not authorized and was not used.

### Results in this workspace

- Node.js `v24.12.0` is available.
- `npm run test:translations`: passed, two tests.
- `node --experimental-strip-types --test tests/connections.test.mjs tests/translations.test.mjs`: passed, five tests. The DOM-shaped test harness executes the actual enhancement script and checks initial visibility, every group activation, the single selected state, visible selected text, and localized group content. It does not replace a real-browser test.
- Text contrast calculations passed for all six primary foreground/background pairs. The lowest measured pair is muted text on the selected control background, at 4.65:1.
- Offline dependency installation failed with `ENOTCACHED`; normal installation failed with `ENOTFOUND registry.npmjs.org`. No lockfile was produced and dependencies were not changed to bypass the failure.
- `npm run check`: blocked (`astro: command not found`).
- `npm test`: blocked at `npm run build` (`astro: command not found`); generated route, metadata, and sitemap tests could not run.
- Source review covers both locales, native button semantics, visible focus, equivalent descriptions, disabled contact, stable reduced-motion behavior, and shrinking/wrapping CSS at the mobile/tablet breakpoints. Real keyboard navigation, screen-reader announcements, rendered overflow at 320/768/1024/1440 pixels, screenshots, and visual typography remain unverified without a working build and browser.

### Next verification once dependencies are available

Run the type check and complete generated-site tests. Open both locales and verify every control with Tab, Enter, Space, and touch. Check 320, 768, 1024, and 1440 pixel viewports, reduced motion, and JavaScript disabled. Confirm that project links, locale hash preservation, native scrolling, and contact exclusion behave correctly. Capture screenshots for comparison before considering any final design or deployment decision.

## Standalone visual preview

`scripts/export-preview.mjs` exports self-contained Spanish and English HTML pages under `preview/`. It reuses the source CSS, localized content, confirmed data, SVG, and actual relationship enhancement script, with a separate preview HTML renderer. No dependency installation or HTTP server is needed. Structure checks passed for document language, one h1, four buttons, unique IDs, valid panel references, embedded assets, and absent contact in both locales. This export does not replace Astro build validation or browser review. A local HTTP server could not bind its socket in the sandbox. GitHub API access works, but Git transport cannot resolve `github.com`; this transport limitation was resolved for branch publication using GitHub’s API. The main GitHub Pages site was not deployed.
