// The local stand-in for the pull request's CI: the subject's check commands run against the pushed head in a clean checkout.
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { CiCheck } from "../config/experiment.js";
import type { CheckResult } from "../core/round-brief.js";
import { runProcess } from "../io/spawn.js";
import { git } from "./git.js";

export interface CiVerdict {
  headSha: string;
  green: boolean;
  checks: CheckResult[];
  wallMs: number;
}

const TAIL_CHARS = 4000;

export async function runSubjectCi(input: {
  originDir: string;
  branch: string;
  checkoutDir: string;
  nodeModulesDir: string | null;
  checks: readonly CiCheck[];
}): Promise<CiVerdict> {
  const startedAt = Date.now();

  mkdirSync(input.checkoutDir, { recursive: true });
  await git(["clone", "--quiet", "--branch", input.branch, input.originDir, input.checkoutDir], input.checkoutDir);
  if (input.nodeModulesDir) {
    const { cpSync } = await import("node:fs");

    cpSync(input.nodeModulesDir, join(input.checkoutDir, "node_modules"), { recursive: true });
  }
  const headSha = await git(["rev-parse", "HEAD"], input.checkoutDir);
  const checks: CheckResult[] = [];

  for (const check of input.checks) {
    const result = await runProcess({
      bin: "sh",
      args: ["-c", check.command],
      cwd: input.checkoutDir,
      env: { ...processEnv(), CI: "true" },
      timeoutMs: check.timeout_minutes * 60_000,
    });
    // Repository-relative paths, as a CI runner's log reads to the agent: the local checkout directory is not where the agent works.
    const output = `${result.stdout}\n${result.stderr}`.replaceAll(`${input.checkoutDir}/`, "");

    checks.push({
      name: check.name,
      passed: result.exitCode === 0 && !result.timedOut,
      tail: result.timedOut ? `timed out after ${check.timeout_minutes} minutes\n${output.slice(-TAIL_CHARS)}` : output.slice(-TAIL_CHARS),
    });
  }

  return { headSha, green: checks.every((check) => check.passed), checks, wallMs: Date.now() - startedAt };
}

function processEnv(): Record<string, string> {
  return Object.fromEntries(Object.entries(process.env).filter((pair): pair is [string, string] => typeof pair[1] === "string"));
}
