# Prototype 02: From Idea to Code

## Design contract

Recruiters should meet Arkaitz and understand his employment goal before inspecting his project. The primary action is reading the source and documentation of mini-consumes-tokens. His confirmed interest in technology and innovation is expressed through a readable explanation of a practical code-indexing tool.

Use an editorial technology composition: a large left-aligned name, readable prose, a narrowing progression from file to index to focused context, and a single dark demonstration surface. This is a capability narrative, not a personal development timeline. Supporting experience and knowledge remain visible below the project.

Palette: paper #ffffff, ink #123d46, muted #526970, surface #edf3f2, accent #086773, selection #e7f3b1. Gill Sans with Trebuchet MS and sans-serif fallbacks gives headings a human technical character; Georgia supplies reading prose; Consolas and monospace are reserved for actual code. Local font stacks avoid network requests; appearance varies by operating system.

Desktop layout:

```
identity                           navigation / language
large name                         employment introduction
file       →       index       →       context
project title + evidence
three visible narrative stages     illustrative code comparison
about                              internship
technologies / tools / AI: clearly separated text sections
```

Plan critique: a newspaper grid and animated timeline could imply invented history. Instead, one narrowing band represents information selection, and stage numbers encode the actual lookup sequence. The project name remains readable as an identifier. Avoid decorative terminal chrome, default card grids, proficiency meters, and invented statistics. Existing reference notes supply content and exploration principles; no external screenshots were available or opened.

## Interaction and implementation

Astro renders both locales and essential project evidence. React is used only for ContextComparison. The language selector is an Astro component with a small script to preserve the current hash. The comparison uses native pressed buttons and a labeled code region. A synthetic invoice sample highlights calculateTotal and its tax-rate dependency; focused mode selects those same lines, retaining original line numbers. It is explicitly illustrative and has no live MCP connection.

The initial server-rendered view shows the full file and selected lines. Buttons are hidden until hydration, so JavaScript-disabled visitors do not see unusable controls. A static caption explains selection. Project description, three stages, stack, and source link remain available independently.

CSS transitions only provide pointer press feedback and slight selection feedback. Keyboard changes are immediate. Reduced motion disables transitions. No GSAP, Motion, Three.js, remote fonts, or animation dependency is added.

At 320px the content stacks in document order. At tablet widths the demonstration remains below the story. Above 1024px story and comparison sit alongside one another. Code wraps inside its panel; long names wrap, grid children can shrink, navigation wraps, and scrolling is native. Focus outlines and textual pressed indicators supplement color.

## Workspace isolation

The workspace has no Git metadata and Git cloning failed with a DNS error. Work is isolated in prototypes/02-idea-to-code. GitHub API confirmed the baseline and target branch share commit 71238d76a73b3a2d406cdae434ddd5efa47b292e. Only this candidate's source, documentation, and review export will be saved on prototype/02-idea-to-code. Main, base/preconfiguration, other prototypes, and the portfolio deployment remain unchanged.

## Validation

Results and preview limitations are recorded after implementation.

### Results

- Node.js v24.12.0 is available.
- `npm run test:translations`: passed, two tests.
- `node --experimental-strip-types --test tests/context-example.test.mjs tests/translations.test.mjs`: passed, four tests. Selection tests cover the function and its dependency, excluded unrelated symbols, original line numbers, and full-file restoration. A DOM-shaped harness executes the standalone enhancement, including pressed state, visible markers, status text, and keyboard/pointer state. This does not validate the React island in a browser.
- Standalone HTML checks passed for both locales: document language, one h1, unique IDs, complete sections, valid internal links and ARIA references, two native buttons, locale routes, available source link, and excluded contact.
- Seven primary foreground/background combinations pass 4.5:1; the lowest is muted text on the pale surface at 5.18:1.
- Offline installation failed with ENOTCACHED. Normal installation failed with ENOTFOUND registry.npmjs.org. No lockfile was generated and no dependency versions were changed.
- `npm run check`: blocked, `astro: command not found`.
- `npm test`: blocked at the Astro build, `astro: command not found`. Generated Astro route, metadata, and sitemap tests remain unverified.
- CSS/source review covers wrapping, shrinking grid columns, 44px control targets, visible focus, native scrolling, both locales, keyboard-immediate states, and reduced-motion rules. Actual keyboard navigation, React hydration, screenshots, screen-reader behavior, font metrics, and overflow at 320/768/1024/1440px remain unverified without dependencies and a browser. Chrome was not authorized and was not used.

### Interaction refinement

| Before | After | Why |
| --- | --- | --- |
| Press feedback could remain active from an earlier pointer action | Keydown immediately selects the no-motion state; pointerdown restores pointer feedback | Keyboard state changes remain immediate |
| Fixed name treatment could depend on local font metrics | Long name spans allow emergency wrapping | Preserve small-screen layout |
| A switch could change panel height markedly on desktop | Code and status regions reserve reading space on desktop | Keep the comparison stable while selecting context |

## Standalone review export

`scripts/export-preview.mjs` creates self-contained `preview/es/index.html` and `preview/en/index.html`. The exporter reuses the actual CSS, translations, confirmed data, and selection model. HTML rendering and the preview DOM enhancement are separate from Astro and React and are explicitly identified as a review export. Both routes use relative links that work under a saved revision URL or when opened locally.

## Remaining verification

Once dependencies can be installed, run the Astro type check and full site tests. Review both locales at 320, 768, 1024, and 1440px; use Tab, Enter, Space, touch, reduced motion, and JavaScript disabled. Verify locale hash preservation and React hydration. This candidate is offered for comparison, not selected as the final design or deployed to the portfolio site.

## Published revision

The candidate is saved on `prototype/02-idea-to-code` in `Zubiarka8/zubiarka8.github.io`. Source and standalone preview commit: `0a5bff0ef5750c3937cc3b0ede2ea43bb8072ef3`.

- [Spanish review export](https://rawcdn.githack.com/Zubiarka8/zubiarka8.github.io/0a5bff0ef5750c3937cc3b0ede2ea43bb8072ef3/preview/es/index.html)
- [English review export](https://rawcdn.githack.com/Zubiarka8/zubiarka8.github.io/0a5bff0ef5750c3937cc3b0ede2ea43bb8072ef3/preview/en/index.html)

Both public URLs returned HTTP 200 and matched the local exports byte for byte. The branch comparison confirms the prototype is based on the preserved preconfiguration baseline. No production deployment was performed.
