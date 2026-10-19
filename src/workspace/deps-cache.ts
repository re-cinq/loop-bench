// Dependencies installed once per base sha, so no agent run installs anything.
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { enforce } from "../core/enforce.js";
import { runProcess } from "../io/spawn.js";
import { git } from "./git.js";

export function cachedNodeModulesDir(cacheDir: string, baseSha: string): string {
  return join(cacheDir, baseSha, "node_modules");
}

export async function ensureDepsCache(input: { cacheDir: string; mirrorDir: string; baseSha: string; installCommand: string }): Promise<string> {
  const dir = cachedNodeModulesDir(input.cacheDir, input.baseSha);

  if (existsSync(dir)) {
    return dir;
  }
  const checkout = join(input.cacheDir, input.baseSha, "checkout");

  rmSync(checkout, { recursive: true, force: true });
  mkdirSync(checkout, { recursive: true });
  await git(["clone", "--quiet", "--no-checkout", input.mirrorDir, checkout], checkout);
  await git(["checkout", "--quiet", input.baseSha], checkout);
  const result = await runProcess({
    bin: "sh",
    args: ["-c", input.installCommand],
    cwd: checkout,
    env: Object.fromEntries(Object.entries(process.env).filter((pair): pair is [string, string] => typeof pair[1] === "string")),
    timeoutMs: 20 * 60_000,
  });

  enforce(result.exitCode === 0, `install failed for ${input.baseSha}: ${result.stderr.slice(-2000)}`);
  const { renameSync } = await import("node:fs");

  renameSync(join(checkout, "node_modules"), dir);
  rmSync(checkout, { recursive: true, force: true });

  return dir;
}
