# Prototype 03: Frequency

## Design contract

Recruiters should immediately identify Arkaitz Zubizarreta, his employment goal, experience, and the source of mini-consumes-tokens. The primary action is inspecting the featured project's code and documentation.

The signature is an original AZ signal: seven parallel angular paths rise into an A, then cross and descend through a Z. Equal spacing gives a repeated rhythm; the active section emphasizes one path. It expresses Arkaitz's interest in technology and information, and his project's focus on selecting useful code context. It is a visual identity, not measured telemetry.

Palette: paper #f4f8fa, ink #12313d, muted #4d626c, signal #006b70, warm highlight #ffc0a1, line #ccdade. A deep petrol project surface gives the real evidence visual weight. Coral is restricted to the signal and active navigation. Trebuchet MS with Arial/sans-serif fallbacks supplies human, technical body text; condensed Impact with Arial Narrow/sans-serif fallbacks shapes the large name. No network font dependency is required; font metrics vary by platform.

Composition:

```
AZ signature / name                      locale
section navigation with active label
name + employment introduction           expansive AZ signal
project purpose / source                 local indexing explanation
about                                    three-month internship
technologies                             complete text list
development tools                        complete text list
AI tools                                 complete text list
```

Plan critique: a continuously oscillating waveform would imply performance readings and distract from employment information. Use fixed angular geometry that only responds to navigation or section focus. Avoid terminal chrome, invented measurements, proficiency meters, and uniform card grids. The preferred references inform professional readability and optional exploration through existing repository notes; no external reference screen was opened.

## Implementation

Astro renders the complete bilingual page. A shared, escaped TypeScript renderer supplies the Astro page and standalone preview, avoiding a second approximation of the composition. Confirmed data stays in src/data and localized text in src/i18n. A small TypeScript enhancement updates the active anchor, a visible current-section label, the selected SVG rail, and the visible section-transition mark on navigation, keyboard focus within a section, or native scrolling. React remains configured but no new island or runtime is needed for this interaction. No GSAP, Three.js, Canvas, remote fonts, or animation dependency is added.

All sections and links work without JavaScript; the static mark remains. The enhanced state label is hidden until initialization. Native links provide keyboard, touch, hash navigation, and locale preservation; focus is never moved by observation. Reduced motion removes transitions and smooth scrolling. Changes have text and aria-current as well as color. Decorative SVG is hidden from assistive technology.

Phones have a compact static mark below the name, a wrapping non-sticky navigation, and stacked project evidence. Tablets use a smaller signal. Desktop places the mark beside the name and expands the project into two reading columns. Long identifiers wrap, list columns can shrink, and document scrolling is native.

## Workspace isolation

The workspace has no Git metadata, and shell GitHub access fails DNS resolution. The GitHub connector confirmed base/preconfiguration and prototype/03-frequency share commit 71238d76a73b3a2d406cdae434ddd5efa47b292e. Implementation is isolated locally in prototypes/03-frequency. Save only this candidate's files and preview on prototype/03-frequency. Do not merge or deploy the portfolio.

## Validation

- Node.js v24.12.0 is available.
- `npm run test:translations`: passed, two tests.
- `node --experimental-strip-types --test tests/frequency.test.mjs tests/translations.test.mjs`: passed, six tests. Both locale renderers preserve confirmed content, unique IDs, valid internal anchors and ARIA references, hidden contact, equivalent routes, and static fallback. A DOM-shaped harness exercises the actual enhancement for every navigation choice, keyboard section focus, observer activation, deep links, invalid hashes, and locale hash preservation. This is not a real-browser keyboard test.
- Both standalone HTML pages contain the exact shared renderer output and actual enhancement script.
- Seven text/background contrast pairs pass 4.5:1; the lowest is signal text on paper at 5.89:1.
- `npm install --ignore-scripts --fetch-retries=0 --fetch-timeout=10000`: blocked with ENOTFOUND registry.npmjs.org. No lockfile was generated and no dependency versions were altered.
- `npm run check`: blocked with astro: command not found.
- `npm test`: blocked at the Astro build with astro: command not found. Generated route, metadata, and sitemap tests remain unverified.
- Source review covers minimum 44px controls, native links, visible focus, non-sticky wrapping navigation, shrinking columns, long-name wrapping, both locales, no animation loops, static mobile geometry, and reduced motion. Actual rendering at 320/768/1024/1440px, screenshots, keyboard traversal, screen-reader behavior, and font metrics remain unverified. Chrome was not used.

## Publication

GitHub CLI write access became available during the owner's publication request. The source and bilingual review exports are saved on prototype/03-frequency at commit ccf0cbc18b1023ffccee82a19a16a6fa4a16a635. The initial connector HTTP 403 and dependency DNS failures are recorded above as verification limits; publication succeeded through the CLI without escalating permissions.

- Spanish saved-revision preview: https://rawcdn.githack.com/Zubiarka8/zubiarka8.github.io/ccf0cbc18b1023ffccee82a19a16a6fa4a16a635/preview/es/index.html
- English saved-revision preview: https://rawcdn.githack.com/Zubiarka8/zubiarka8.github.io/ccf0cbc18b1023ffccee82a19a16a6fa4a16a635/preview/en/index.html
- Direct Spanish route: https://zubiarka8.github.io/prototypes/03-frequency/es/
- Direct English route: https://zubiarka8.github.io/prototypes/03-frequency/en/

The owner also authorized a bilingual directory on the main website containing direct links to all available prototypes. This separately publishes static review copies, without selecting Frequency as the final design or merging its source into main. The baseline and competing candidate branches are preserved.

## Standalone review export

`scripts/export-preview.mjs` generates `preview/es/index.html` and `preview/en/index.html` with relative locale routes and embedded CSS/JavaScript. It shares the actual TypeScript page renderer, confirmed data, translations, and enhancement with Astro. Open either file locally for visual review. The export is not an Astro production build.

## Next verification

Once dependencies are available, run the type check and full site tests. Review both locales at 320, 768, 1024, and 1440px, using Tab, Enter, touch, reduced motion, and JavaScript disabled. Verify locale hash preservation and scrolling state changes. The source and exports are saved; verify the published Pages routes after the deployment completes.
