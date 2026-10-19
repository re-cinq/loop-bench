import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function git(args: readonly string[], cwd: string): Promise<string> {
  const { stdout } = await execFileAsync("git", [...args], { cwd, maxBuffer: 64 * 1024 * 1024 });

  return stdout.trimEnd();
}

export const headSha = (cwd: string): Promise<string> => git(["rev-parse", "HEAD"], cwd);

export const refSha = (cwd: string, ref: string): Promise<string> => git(["rev-parse", ref], cwd);

export const numstat = (cwd: string, base: string, head: string): Promise<string> => git(["diff", "--numstat", `${base}..${head}`], cwd);

export const diffOf = (cwd: string, base: string, head: string, paths: readonly string[] = []): Promise<string> =>
  git(["diff", `${base}..${head}`, "--", ...paths], cwd);

export const changedFiles = (cwd: string, base: string, head: string): Promise<string[]> =>
  git(["diff", "--name-only", `${base}..${head}`], cwd).then((out) => out.split("\n").filter((line) => line.length > 0));
