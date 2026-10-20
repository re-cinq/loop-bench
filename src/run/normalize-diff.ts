// A branch's diff with the formatting noise removed: both sides of every changed file go through the subject's own prettier before they are diffed.
import { execFile } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { git } from "../workspace/git.js";

const execFileAsync = promisify(execFile);
const LARGE_OUTPUT = 64 * 1024 * 1024;

export interface NormalizeInput {
  /** A repository holding both commits. */
  gitDir: string;
  baseSha: string;
  headSha: string;
  prettierBin: string;
  /** Regular expression for the paths prettier formats; every other changed file keeps its text as it is. */
  formatPattern: string;
}

export function formattedPaths(paths: readonly string[], formatPattern: string): string[] {
  const pattern = new RegExp(formatPattern);

  return paths.filter((path) => pattern.test(path));
}

const lines = (output: string): string[] => output.split("\n").filter((line) => line.length > 0);

async function checkout(input: NormalizeInput, sha: string, changed: readonly string[], dir: string): Promise<string[]> {
  const existing = changed.length === 0 ? [] : lines(await git(["ls-tree", "-r", "--name-only", sha, "--", ...changed], input.gitDir));
  const archive = `${dir}.tar`;

  mkdirSync(dir, { recursive: true });
  if (existing.length > 0) {
    await execFileAsync("git", ["archive", "--format=tar", `--output=${archive}`, sha, "--", ...existing], { cwd: input.gitDir, maxBuffer: LARGE_OUTPUT });
    await execFileAsync("tar", ["-xf", archive, "-C", dir]);
  }
  const configText = await git(["show", `${input.baseSha}:.prettierrc`], input.gitDir).catch(() => "");
  if (configText !== "") {
    writeFileSync(join(dir, ".prettierrc"), `${configText}\n`);
  }

  return formattedPaths(existing, input.formatPattern);
}

/** Prettier exits non-zero when one file does not parse yet still formats the others, so a failure here only leaves that file as written. */
async function format(input: NormalizeInput, dir: string, paths: readonly string[]): Promise<void> {
  if (paths.length === 0) {
    return;
  }
  await execFileAsync("node", [input.prettierBin, "--write", "--log-level", "silent", ...paths], { cwd: dir, maxBuffer: LARGE_OUTPUT }).catch(() => undefined);
}

export async function normalizedDiff(input: NormalizeInput): Promise<string> {
  const changed = lines(await git(["diff", "--name-only", `${input.baseSha}..${input.headSha}`], input.gitDir));
  const work = mkdtempSync(join(tmpdir(), "loop-bench-normalize-"));
  const baseDir = join(work, "base");
  const headDir = join(work, "head");
  const compareDir = join(work, "compare");

  try {
    const [baseFormatted, headFormatted] = await Promise.all([
      checkout(input, input.baseSha, changed, baseDir),
      checkout(input, input.headSha, changed, headDir),
    ]);
    await Promise.all([format(input, baseDir, baseFormatted), format(input, headDir, headFormatted)]);

    const inCompare = (args: readonly string[]): Promise<string> => git(["-c", "user.name=loop-bench", "-c", "user.email=loop-bench@localhost", ...args], compareDir);
    mkdirSync(compareDir, { recursive: true });
    await inCompare(["init", "--quiet"]);
    cpSync(baseDir, compareDir, { recursive: true });
    await inCompare(["add", "-A"]);
    await inCompare(["commit", "--quiet", "--allow-empty", "-m", "base"]);
    for (const path of changed) {
      rmSync(join(compareDir, path), { force: true });
    }
    cpSync(headDir, compareDir, { recursive: true });
    await inCompare(["add", "-A"]);
    await inCompare(["commit", "--quiet", "--allow-empty", "-m", "head"]);

    return await inCompare(["diff", "--ignore-blank-lines", "HEAD~1", "HEAD"]);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

export const prettierBinIn = (nodeModulesDir: string): string | null => {
  const bin = join(nodeModulesDir, "prettier", "bin", "prettier.cjs");

  return existsSync(bin) ? bin : null;
};
