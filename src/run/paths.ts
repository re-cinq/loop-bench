import { join } from "node:path";

export interface BenchPaths {
  root: string;
  promptsDir: string;
  runsDir: string;
  cacheDir: string;
  resultsDir: string;
  artifactsDir: string;
}

export function benchPaths(root: string): BenchPaths {
  return {
    root,
    promptsDir: join(root, "prompts"),
    runsDir: join(root, "runs"),
    cacheDir: join(root, "cache"),
    resultsDir: join(root, "results"),
    artifactsDir: join(root, "artifacts"),
  };
}
