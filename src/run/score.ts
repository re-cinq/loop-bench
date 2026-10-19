// Scoring a finished loop: the deterministic dod check, and the judge's verdict on the diff.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExperimentConfig, Ticket } from "../config/experiment.js";
import { buildJudgePrompt, parseJudgeOutput, type JudgeScores } from "../core/judge.js";
import type { LoopRecord } from "../core/records.js";
import { finalText } from "../core/result-line.js";
import { ADAPTERS } from "../harness/adapters.js";
import type { InvocationSpec } from "../harness/harness.js";
import { buildScratchHome } from "../harness/scratch-home.js";
import { runProcess } from "../io/spawn.js";
import { cachedNodeModulesDir } from "../workspace/deps-cache.js";
import { changedFiles, diffOf, git } from "../workspace/git.js";
import type { BenchPaths } from "./paths.js";

export interface DodCheck {
  acceptance_files: string[];
  red_on_base: boolean | null;
  green_with_reference: boolean | null;
  detail: string;
}

const DONE_WHEN = /## Done when these pass([\s\S]*?)(?:\n## |$)/;

/** The test files `.lore/dod.md` names under "Done when these pass", as backticked paths. */
export function acceptanceFilesOf(dodMarkdown: string, fallback: readonly string[]): string[] {
  const section = DONE_WHEN.exec(dodMarkdown)?.[1] ?? "";
  const named = [...section.matchAll(/`([^`\n]+\.[a-z]+)`/g)].map((match) => match[1] ?? "").filter((path) => /\.(test|spec)\./.test(path));

  return named.length > 0 ? [...new Set(named)] : [...fallback];
}

/** Red on the base, green once the merged pull request's production code is applied on top: the acceptance tests define the ticket and nothing else. */
export async function scoreDod(input: {
  config: ExperimentConfig;
  paths: BenchPaths;
  ticket: Ticket;
  cellDir: string;
  testCommand: (files: readonly string[]) => string;
}): Promise<DodCheck | null> {
  const bundle = join(input.cellDir, "branch.bundle");
  const dodPath = join(input.cellDir, "dod.md");

  if (!existsSync(bundle) || !existsSync(dodPath)) {
    return null;
  }
  const work = join(input.paths.runsDir, `score-${Date.now()}`);

  mkdirSync(work, { recursive: true });
  try {
    const repo = join(work, "repo");

    await git(["clone", "--quiet", input.config.subject.mirror_dir, repo], work);
    await git(["fetch", "--quiet", bundle, `refs/heads/loop-bench/${input.ticket.number}:refs/heads/candidate`], repo);
    await git(["checkout", "--quiet", "candidate"], repo);
    const testFile = new RegExp(input.config.subject.test_file_pattern);
    const added = (await changedFiles(repo, input.ticket.base_sha, "candidate")).filter((path) => testFile.test(path));
    const acceptance = acceptanceFilesOf(readFileSync(dodPath, "utf8"), added).filter((path) => existsSync(join(repo, path)));

    if (acceptance.length === 0) {
      return { acceptance_files: [], red_on_base: null, green_with_reference: null, detail: "no acceptance test file found on the branch" };
    }
    const nodeModules = cachedNodeModulesDir(join(input.paths.cacheDir, input.config.id), input.ticket.base_sha);
    const { cpSync } = await import("node:fs");

    if (existsSync(nodeModules)) {
      cpSync(nodeModules, join(repo, "node_modules"), { recursive: true });
    }
    const run = async (): Promise<{ passed: boolean; tail: string }> => {
      const result = await runProcess({ bin: "sh", args: ["-c", input.testCommand(acceptance)], cwd: repo, env: envOf(), timeoutMs: 10 * 60_000 });

      return { passed: result.exitCode === 0, tail: `${result.stdout}\n${result.stderr}`.slice(-3000) };
    };
    const onBase = await run();
    const productionDiff = await diffOf(
      input.config.subject.mirror_dir,
      input.ticket.base_sha,
      input.ticket.merge_sha,
      (await changedFiles(input.config.subject.mirror_dir, input.ticket.base_sha, input.ticket.merge_sha)).filter((path) => !testFile.test(path) && !path.startsWith(".lore/")),
    );

    writeFileSync(join(work, "reference-production.patch"), productionDiff);
    const applied = await runProcess({ bin: "git", args: ["apply", "--3way", join(work, "reference-production.patch")], cwd: repo, env: envOf(), timeoutMs: 60_000 });
    const withReference = applied.exitCode === 0 ? await run() : { passed: false, tail: `reference patch did not apply: ${applied.stderr.slice(-1500)}` };
    const check: DodCheck = {
      acceptance_files: acceptance,
      red_on_base: !onBase.passed,
      green_with_reference: withReference.passed,
      detail: `on base: ${onBase.passed ? "green" : "red"}\n${onBase.tail}\n\nwith reference production code: ${withReference.passed ? "green" : "red"}\n${withReference.tail}`,
    };

    writeFileSync(join(input.cellDir, "dod-check.json"), JSON.stringify(check, null, 2));

    return check;
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

export async function scoreJudge(input: { config: ExperimentConfig; paths: BenchPaths; ticket: Ticket; cellDir: string }): Promise<(JudgeScores & { model: string }) | null> {
  const patch = join(input.cellDir, "diff.patch");

  if (!existsSync(patch)) {
    return null;
  }
  const dodPath = join(input.cellDir, "dod.md");
  const prompt = buildJudgePrompt({
    ticket: readFileSync(join(input.paths.root, "experiments", input.ticket.ticket_file), "utf8"),
    referenceDiff: await diffOf(input.config.subject.mirror_dir, input.ticket.base_sha, input.ticket.merge_sha),
    candidateDiff: readFileSync(patch, "utf8"),
    dodMarkdown: existsSync(dodPath) ? readFileSync(dodPath, "utf8") : null,
    diffCapChars: input.config.judge.diff_cap_chars,
  });
  const judge = input.config.judge;
  const homeDir = join(input.paths.runsDir, `judge-home-${Date.now()}`);
  const workspaceDir = join(homeDir, "empty");

  mkdirSync(workspaceDir, { recursive: true });
  const spec: InvocationSpec = { model: judge.model, prompt, workspaceDir, homeDir, mcp: null, extraEnv: {}, gemini: input.config.gemini ?? null, userHome: process.env["HOME"] ?? "" };
  const adapter = ADAPTERS[judge.harness];

  buildScratchHome({ spec, adapter, promptsDir: input.paths.promptsDir, skills: [] });
  const command = adapter.command(spec);
  const result = await runProcess({ ...command, args: withoutTools(judge.harness, command.args, homeDir), timeoutMs: 15 * 60_000, stdoutPath: join(input.cellDir, "judge-stdout.jsonl") });
  const text = finalText(judge.harness, result.stdout);
  const scores = parseJudgeOutput(text);

  writeFileSync(join(input.cellDir, "judge.json"), JSON.stringify({ model: judge.model, harness: judge.harness, scores, raw: text }, null, 2));
  rmSync(homeDir, { recursive: true, force: true });

  return scores ? { ...scores, model: judge.model } : null;
}

const DENY_ALL_POLICY = `[[rule]]\ntoolName = "*"\ndecision = "deny"\npriority = 300\n`;

/** The judge reads its brief and answers; it uses no tools. */
function withoutTools(harness: ExperimentConfig["judge"]["harness"], args: string[], homeDir: string): string[] {
  if (harness === "claude") {
    return ["--tools", "", ...args.filter((arg) => arg !== "--dangerously-skip-permissions")];
  }
  if (harness === "gemini") {
    const policy = join(homeDir, ".gemini", "deny-all.toml");

    writeFileSync(policy, DENY_ALL_POLICY);
    const index = args.indexOf("--policy");

    return index >= 0 ? [...args.slice(0, index), "--policy", policy, ...args.slice(index + 2)] : [...args, "--policy", policy];
  }

  return args.map((arg) => (arg === "--dangerously-bypass-approvals-and-sandbox" ? "--sandbox" : arg)).flatMap((arg) => (arg === "--sandbox" ? ["--sandbox", "read-only"] : [arg]));
}

function envOf(): Record<string, string> {
  return Object.fromEntries(Object.entries(process.env).filter((pair): pair is [string, string] => typeof pair[1] === "string"));
}

export function withScores(record: LoopRecord, dodCheck: DodCheck | null, judge: (JudgeScores & { model: string }) | null): LoopRecord {
  return { ...record, dod_check: dodCheck ?? record.dod_check, judge: judge ?? record.judge };
}
