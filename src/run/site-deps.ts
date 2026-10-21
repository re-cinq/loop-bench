// The website's diff pages format both sides of a diff with the prettier the subject pinned at each ticket's base commit.
// A machine that has run the benchmark has it in the dependency cache; a CI runner installs just that one package.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import type { ExperimentConfig } from "../config/experiment.js";
import { runProcess } from "../io/spawn.js";
import { cachedNodeModulesDir } from "../workspace/deps-cache.js";
import { git } from "../workspace/git.js";
import { prettierBinIn } from "./normalize-diff.js";

const LockSchema = z.object({ packages: z.record(z.object({ version: z.string().optional() })).optional() });

/** The exact prettier version a package-lock.json resolved, or null when the lock does not hold one. */
export function prettierVersionFromLock(lockText: string): string | null {
  const parsed = LockSchema.safeParse(JSON.parse(lockText));

  return parsed.success ? (parsed.data.packages?.["node_modules/prettier"]?.version ?? null) : null;
}

export interface SiteDepsResult {
  ticket: number;
  baseSha: string;
  status: "cached" | "installed" | "no-prettier-pinned";
  version: string | null;
}

/** Makes `<cache>/<experiment>/<base>/node_modules/prettier` exist for every ticket, installing only what is missing. */
export async function ensureSitePrettier(config: ExperimentConfig, cacheDir: string): Promise<SiteDepsResult[]> {
  const results: SiteDepsResult[] = [];

  for (const ticket of config.tickets) {
    const experimentCache = join(cacheDir, config.id);
    const nodeModules = cachedNodeModulesDir(experimentCache, ticket.base_sha);

    if (prettierBinIn(nodeModules) || existsSync(join(experimentCache, ticket.base_sha, "deps-tree"))) {
      results.push({ ticket: ticket.number, baseSha: ticket.base_sha, status: "cached", version: null });
      continue;
    }
    const lock = await git(["show", `${ticket.base_sha}:package-lock.json`], config.subject.mirror_dir).catch(() => "");
    const version = lock === "" ? null : prettierVersionFromLock(lock);

    if (version === null) {
      results.push({ ticket: ticket.number, baseSha: ticket.base_sha, status: "no-prettier-pinned", version: null });
      continue;
    }
    const install = await runProcess({
      bin: "npm",
      args: ["install", "--prefix", join(experimentCache, ticket.base_sha), "--no-save", "--ignore-scripts", "--no-audit", "--no-fund", `prettier@${version}`],
      cwd: cacheDir,
      env: { PATH: process.env["PATH"] ?? "/usr/bin:/bin", HOME: process.env["HOME"] ?? "/tmp" },
      timeoutMs: 5 * 60_000,
    });

    if (install.exitCode !== 0) {
      throw new Error(`installing prettier@${version} for #${ticket.number} failed: ${install.stderr.slice(-500)}`);
    }
    results.push({ ticket: ticket.number, baseSha: ticket.base_sha, status: "installed", version });
  }

  return results;
}
