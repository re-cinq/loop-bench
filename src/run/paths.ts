import { join } from "node:path";

export interface BenchPaths {
  root: string;
  promptsDir: string;
  runsDir: string;
  cacheDir: string;
  resultsDir: string;
  artifactsDir: string;
}

/**
 * Agents run outside the user's home: Claude Code loads `.claude/CLAUDE.md` from every ancestor of its working directory,
 * so a run under ~/ picks up the user's personal instructions as project instructions (found 2026-10-19).
 */
export const DEFAULT_RUNS_DIR = "/var/tmp/loop-bench/runs";

export function benchPaths(root: string, runsDir: string = process.env["LOOP_BENCH_RUNS"] ?? DEFAULT_RUNS_DIR): BenchPaths {
  return {
    root,
    promptsDir: join(root, "prompts"),
    runsDir,
    cacheDir: join(root, "cache"),
    resultsDir: join(root, "results"),
    artifactsDir: join(root, "artifacts"),
  };
}
