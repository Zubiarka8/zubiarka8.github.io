# Prototype directory

The owner authorized publishing Frequency and a directory of direct preview links at https://zubiarka8.github.io/. Main previously contained only the initial README. This change adds a bilingual static directory and copies of the three available review exports. It does not select or integrate a final portfolio design.

## Routes

- `/`, `/es/`, `/en/`: localized preview directory.
- `/prototypes/01-connections/es/` and `/prototypes/01-connections/en/`.
- `/prototypes/02-idea-to-code/es/` and `/prototypes/02-idea-to-code/en/`.
- `/prototypes/03-frequency/es/` and `/prototypes/03-frequency/en/`.

Prototypes 01 and 02 are copied from their saved branch revisions, retaining embedded styling, scripts, and relative locale links. Frequency uses source/review commit ccf0cbc18b1023ffccee82a19a16a6fa4a16a635. Prototype 04 is labeled pending and has no inactive preview link. The baseline and other prototype branches remain preserved.

The directory is a compact text list with native links, visible focus, wrapping mobile layout, a skip link, and equivalent Spanish/English content. It uses the existing local UI engineering guidance. No dependency, browser automation, new animation, or global skill is involved.

## Publication

The GitHub Pages workflow uploads `site/` directly as a static artifact. It needs no npm dependencies. This is publication of review exports, not a successful Astro production compilation; installation/type/build limitations remain documented with the source candidates.

Regenerate directory pages using `node scripts/build-hub.mjs`. Keep export revisions and copied pages synchronized when a candidate changes. The final portfolio will need its own reviewed build/deployment configuration when selected.
