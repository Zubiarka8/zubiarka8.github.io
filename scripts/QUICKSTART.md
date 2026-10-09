# Quick start

Requires Node.js 24. GitHub commands also require the `gh` CLI and an authenticated account.

From the repository root on this Mac:

```sh
node scripts/repo.mjs doctor --offline
npm run pages:build
npm run pages:check
```

`pages:build` generates or updates the preview directory at `/`, `/es/`, `/en/`, then checks its links and local files. It does not publish. Publish the website directory with `node scripts/repo.mjs publish-hub`.

To add or update a design preview as well, run `node scripts/repo.mjs release 03-frequency`. That command exports and checks both language versions, saves the prototype, updates the directory page, publishes the deployment, waits for GitHub Pages, then checks the public pages.

For another prototype, replace `03-frequency` with its configured slug. See [the full automation guide](README.md) for all available commands and for running from a standalone candidate checkout.
