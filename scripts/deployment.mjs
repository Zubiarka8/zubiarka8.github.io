export async function waitForDeployment(readRuns, sha, {
  timeoutMs = 300000,
  intervalMs = 5000,
  now = Date.now,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
} = {}) {
  const deadline = now() + timeoutMs;
  do {
    const run = readRuns().find((item) => item.headSha === sha);
    if (run?.status === 'completed') {
      if (run.conclusion !== 'success') throw new Error(`Pages deployment ${run.conclusion}: ${run.url}`);
      return run;
    }
    if (now() >= deadline) break;
    await sleep(Math.min(intervalMs, deadline - now()));
  } while (now() <= deadline);
  throw new Error(`Timed out waiting for Pages deployment of ${sha}. Check GitHub Actions before verifying.`);
}
