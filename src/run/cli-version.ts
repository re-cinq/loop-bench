import type { Harness } from "../core/harness-names.js";
import { ADAPTERS } from "../harness/adapters.js";
import { runProcess } from "../io/spawn.js";
import { CODEX_BIN } from "../harness/codex.js";

const cache = new Map<Harness, Promise<string>>();

export function cliVersion(harness: Harness): Promise<string> {
  const cached = cache.get(harness);

  if (cached) {
    return cached;
  }
  const adapter = ADAPTERS[harness];
  const version = runProcess({
    bin: harness === "codex" ? CODEX_BIN : adapter.name,
    args: adapter.versionArgs,
    cwd: process.cwd(),
    env: { PATH: process.env["PATH"] ?? "", HOME: process.env["HOME"] ?? "" },
    timeoutMs: 30_000,
  }).then((result) => `${result.stdout}${result.stderr}`.trim().split("\n")[0] ?? "unknown");

  cache.set(harness, version);

  return version;
}
