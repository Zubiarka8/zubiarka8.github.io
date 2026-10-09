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

## Repeatable automation

Configuration lives in `prototypes.json`: one entry per candidate with its isolated branch, localized description, and immutable preview revision. A null revision means pending; the directory never generates links for it.

Run from this folder (or the repository root when these files are checked out from main):

```sh
npm run build
npm run check
npm test
npm run preview:export -- 03-frequency
npm run preview:refresh -- 03-frequency
npm run preview:publish -- 03-frequency
npm run hub:publish
npm run verify:public
```

In this workspace the default source path is `../prototypes/<slug>`. In a standalone candidate checkout, use an explicit source path:

```sh
npm run preview:export -- 03-frequency --source /path/to/candidate
npm run preview:publish -- 03-frequency --source /path/to/candidate
```

The complete update sequence is export/publish the candidate, publish the hub, wait for the Pages workflow, then verify the public files. `preview:publish` already exports the candidate, runs its dependency-free tests, saves source and both preview routes, and refreshes the local hub entry using the returned commit SHA. `preview:refresh` without a slug refreshes all available candidates from their current branch heads. To activate a pending candidate, supply its slug explicitly once its export exists.

The publisher uses GitHub's Git data API through the authenticated `gh` CLI, so it works without a local `.git` folder. It preserves the existing base tree and updates refs without force. It rechecks the branch head before updating; GitHub also rejects a later race. Identical trees cause no extra commit or deployment. Candidate publication uploads source, tests, documentation, scripts, public assets, configuration, and preview files; it preserves unrelated baseline files and does not propagate file deletions. Main publication uploads only the hub's explicit file groups.

Remote refresh stages every download and validates the complete next directory before replacing local pages and the manifest. Publication never selects a final portfolio design. Local generation, validation, and unit tests need only Node.js 24; publication/refresh need authenticated GitHub access. Binary assets are uploaded as base64 Git blobs. Symlinks are rejected.

The public verification command compares all nine HTML pages byte for byte, with request timeouts and an error exit on missing/stale content. Wait for deployment completion before using it. It verifies file delivery, not browser layout, keyboard behavior, or a production Astro build.

## Automation validation

- `npm run build` and `npm run check`: passed for all nine routes.
- `npm test`: ten tests passed, including branch races, non-forced rejection, unchanged snapshots, disabled candidates, escaped content, broken links, and symlink handling.
- Exporting Frequency through the CLI regenerates both routes and passes its six source/translation tests.
- GitHub Pages runs the directory build and automation tests before uploading the static artifact. No npm installation is required.

## Repository-wide commands

See [repository automation](repository-automation.md) for the macOS command entry point, environment diagnosis, dependency installation, development server, full Astro checks, local all-candidate validation, and release orchestration. Deployment waiting is tested for the exact published SHA, unrelated runs, failed jobs, and timeout. All available candidates plus the automation suite pass 25 local tests. Full Astro validation remains blocked by unavailable dependencies.
