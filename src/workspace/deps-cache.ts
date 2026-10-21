// Dependencies installed once per base sha, so no agent run installs anything. A single-package repo keeps its root
// node_modules; a workspace monorepo keeps every node_modules folder at its path under deps-tree/. Runs get a reflink copy.
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { enforce } from "../core/enforce.js";
import { runProcess } from "../io/spawn.js";
import { git } from "./git.js";

export type DepsLayout = "root" | "workspace";

export function cachedNodeModulesDir(cacheDir: string, baseSha: string): string {
  return join(cacheDir, baseSha, "node_modules");
}

function cachedDepsTree(cacheDir: string, baseSha: string): string {
  return join(cacheDir, baseSha, "deps-tree");
}

/** Where a run's dependencies come from: the cached root node_modules, or the cached tree of every node_modules folder. */
export function cachedDeps(cacheDir: string, baseSha: string): string | null {
  const tree = cachedDepsTree(cacheDir, baseSha);
  const root = cachedNodeModulesDir(cacheDir, baseSha);

  if (existsSync(tree)) {
    return tree;
  }

  return existsSync(root) ? root : null;
}

/** Every node_modules folder under dir, not descending into one. */
export function nodeModulesFolders(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory() || entry.name === ".git") {
      return [];
    }
    const path = join(entry.parentPath, entry.name);

    return entry.name === "node_modules" ? [path] : nodeModulesFolders(path);
  });
}

/** Copies a run's dependencies into a checkout: reflinks on btrfs/xfs, a plain copy elsewhere. */
export async function copyDeps(source: string, targetDir: string): Promise<void> {
  const pairs = source.endsWith("deps-tree")
    ? nodeModulesFolders(source).map((folder) => [folder, join(targetDir, relative(source, folder))] as const)
    : [[source, join(targetDir, "node_modules")] as const];

  for (const [from, to] of pairs) {
    mkdirSync(dirname(to), { recursive: true });
    const result = await runProcess({ bin: "cp", args: ["-a", "--reflink=auto", from, to], cwd: targetDir, env: { PATH: process.env["PATH"] ?? "/usr/bin:/bin" }, timeoutMs: 10 * 60_000 });

    enforce(result.exitCode === 0, `copying dependencies to ${to} failed: ${result.stderr.slice(-500)}`);
  }
}

export async function ensureDepsCache(input: { cacheDir: string; mirrorDir: string; baseSha: string; installCommand: string; layout?: DepsLayout; env?: Record<string, string> }): Promise<string> {
  const existing = cachedDeps(input.cacheDir, input.baseSha);

  if (existing) {
    return existing;
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
    env: { ...Object.fromEntries(Object.entries(process.env).filter((pair): pair is [string, string] => typeof pair[1] === "string")), ...input.env },
    timeoutMs: 30 * 60_000,
  });

  enforce(result.exitCode === 0, `install failed for ${input.baseSha}: ${result.stderr.slice(-2000)}`);
  moveInstalledDeps(checkout, input);
  rmSync(checkout, { recursive: true, force: true });

  return cachedDeps(input.cacheDir, input.baseSha) ?? "";
}

function moveInstalledDeps(checkout: string, input: { cacheDir: string; baseSha: string; layout?: string | undefined }): void {
  if ((input.layout ?? "root") === "root") {
    renameSync(join(checkout, "node_modules"), cachedNodeModulesDir(input.cacheDir, input.baseSha));

    return;
  }
  const tree = cachedDepsTree(input.cacheDir, input.baseSha);

  for (const folder of nodeModulesFolders(checkout)) {
    const to = join(tree, relative(checkout, folder));

    mkdirSync(dirname(to), { recursive: true });
    renameSync(folder, to);
  }
}
