// Resolve the workspace implementation or its published main-branch location.
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const local = new URL('../prototype-hub/scripts/previews.mjs', import.meta.url);
const published = new URL('./previews.mjs', import.meta.url);
const implementation = existsSync(fileURLToPath(local)) ? local : published;
await import(implementation.href);
