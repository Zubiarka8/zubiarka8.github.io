# Repository automation on macOS

Use Node.js 24 for repository orchestration and `gh` for authenticated GitHub API operations. The existing Astro/TypeScript export code runs directly under Node, and the automation has no extra npm dependencies. The macOS shell launches commands; GitHub Actions validates and deploys. Python is not needed for these workflows. A macOS scheduler is unnecessary because execution is explicit or triggered by a repository push.

The workspace entry point is `node scripts/repo.mjs`. It delegates to the single implementation in `prototype-hub/scripts/previews.mjs`. The root project also exposes `npm run pages:build`, `npm run pages:check`, and `npm run preview:release`. On a standalone published-main checkout, invoke `node scripts/previews.mjs` directly. Start with [the quick guide](QUICKSTART.md).

| Command after the entry point | Process |
| --- | --- |
| `doctor --offline` | Check local Node/npm/gh availability, configuration, and routes. |
| `doctor` | Also check GitHub authentication and repository read access. |
| `install 03-frequency` | Use npm ci with an existing lockfile, otherwise npm install. |
| `dev 03-frequency` | Launch that candidate's Astro development server. |
| `validate-astro 03-frequency` | Run Astro type checks, generated-site tests, and translations; stop on failure. |
| `export 03-frequency` | Generate both review routes and run dependency-free source tests. |
| `check-all` | Export and test all available local candidates, build the hub, validate links, and test automation. |
| `refresh` | Stage and validate all available candidates from their saved remote branch heads. |
| `publish-prototype 03-frequency` | Export, test, save the isolated branch, and refresh the local directory copy. |
| `publish-hub` | Validate and save the directory, scripts, and configuration on main. |
| `release 03-frequency` | Publish candidate and hub, wait for the exact main commit's Pages workflow, then compare all public HTML pages. |
| `verify` | Compare published HTML with the current local directory. |
| `prepare-hub --base <sha> --output <file>` | Produce the Git tree request locally for review or a constrained publication environment. |

Example:

```sh
node scripts/repo.mjs doctor --offline
node scripts/repo.mjs check-all
node scripts/repo.mjs release 03-frequency
```

Candidate commands accept `--source /path/to/candidate`. In this workspace they default to `prototypes/<slug>`. On a standalone main checkout, use an explicit source folder for export/install/dev/source-validation/release. Hub checks, refresh, publication, and public verification work with main's files alone. Unimplemented candidates are excluded from `check-all` and the default refresh.

Local checking and publication are distinct actions. `check-all` validates review exports; use `validate-astro` for the full candidate build after dependency installation. A failed workflow, timeout, concurrent branch update, missing route, or mismatched public file stops the command with a nonzero exit code. No force update is attempted. Re-running identical publication avoids duplicate commits.

Publication needs normal network access and authenticated gh. This managed workspace sometimes blocks network calls made by subprocesses or Node fetch while direct approved CLI calls work. This is an execution-environment restriction, not a reason to add a second publisher in Python. `prepare-hub` provides the same request data for a direct GitHub API call. The full release sequence is not verified end to end in this restricted environment.
