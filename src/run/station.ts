// One station visit: the prompt, a scratch HOME, the CLI run to its deadline, and what it reported.
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AgentChoice, ExperimentConfig } from "../config/experiment.js";
import type { ContextMode, Station } from "../core/harness-names.js";
import { costOf } from "../core/pricing.js";
import { buildStationPrompt } from "../core/prompt.js";
import type { StationRunRecord } from "../core/records.js";
import { finalText, parseNodeResult } from "../core/result-line.js";
import { usageFromStream } from "../core/usage.js";
import { ADAPTERS } from "../harness/adapters.js";
import type { InvocationSpec } from "../harness/harness.js";
import { loreStdioServer } from "../harness/mcp.js";
import { buildScratchHome } from "../harness/scratch-home.js";
import { runProcess, type SpawnResult } from "../io/spawn.js";
import { pushedHead, type RunWorkspace } from "../workspace/prepare.js";
import type { BenchPaths } from "./paths.js";

const SKILLS: Record<Station, string[]> = {
  dod: ["lore-context", "tdd-loop", "legacy-characterize"],
  "tdd-round": ["lore-context", "tdd-loop"],
  "repair-build": ["lore-context"],
};

export interface StationPlan {
  experimentId: string;
  loopId: string;
  ticket: { number: number; title: string };
  station: Station;
  choice: AgentChoice;
  promptVariant: string;
  contextMode: ContextMode;
  round: number;
  attempt: number;
  /** Where this visit's prompt, stdout, stderr and record land. */
  visitDir: string;
  homeDir: string;
}

export interface StationDeps {
  config: ExperimentConfig;
  paths: BenchPaths;
  workspace: RunWorkspace;
  cliVersion: (harness: AgentChoice["harness"]) => Promise<string>;
  spawn?: typeof runProcess;
}

export async function runStation(plan: StationPlan, deps: StationDeps): Promise<StationRunRecord> {
  const { config, paths, workspace } = deps;
  const spawn = deps.spawn ?? runProcess;
  const markdown = readFileSync(join(paths.promptsDir, plan.station, `${plan.promptVariant}.md`), "utf8");
  const built = buildStationPrompt({
    markdown,
    workspaceDir: workspace.workspaceDir,
    ticketPath: workspace.ticketPath,
    header: { repo: config.subject.repo, ticketNumber: plan.ticket.number, ticketTitle: plan.ticket.title },
  });
  const spec: InvocationSpec = {
    model: plan.choice.model,
    prompt: built.prompt,
    workspaceDir: workspace.workspaceDir,
    homeDir: plan.homeDir,
    mcp: plan.contextMode === "lore-mcp" ? loreServer(config) : null,
    extraEnv: plan.station === "tdd-round" ? { LORE_ACCEPTANCE_DOD: join(workspace.targetDir, ".lore", "dod.md") } : {},
    gemini: config.gemini ?? null,
    userHome: process.env["HOME"] ?? "",
  };
  const adapter = ADAPTERS[plan.choice.harness];

  mkdirSync(plan.visitDir, { recursive: true });
  buildScratchHome({ spec, adapter, promptsDir: paths.promptsDir, skills: SKILLS[plan.station] });
  writeFileSync(join(plan.visitDir, "prompt.md"), built.prompt);
  const command = adapter.command(spec);
  const headBefore = (await pushedHead(workspace)) ?? "";
  const startedAt = new Date();
  const result = await spawn({
    ...command,
    timeoutMs: config.station_timeout_minutes[plan.station] * 60_000,
    stdoutPath: join(plan.visitDir, "stdout.jsonl"),
    stderrPath: join(plan.visitDir, "stderr.log"),
  });
  const headAfter = (await pushedHead(workspace)) ?? "";
  const text = finalText(plan.choice.harness, result.stdout);
  const nodeResult = parseNodeResult(text);
  const usage = usageFromStream(plan.choice.harness, result.stdout);
  const cost = costOf(plan.choice.harness, plan.choice.model, usage);

  writeFileSync(join(plan.visitDir, "final-message.md"), text);
  const record: StationRunRecord = {
    kind: "station_run",
    experiment_id: plan.experimentId,
    loop_id: plan.loopId,
    run_id: randomUUID(),
    ticket: plan.ticket.number,
    station: plan.station,
    round: plan.round,
    attempt: plan.attempt,
    harness: plan.choice.harness,
    model: plan.choice.model,
    prompt_variant: plan.promptVariant,
    context_mode: plan.contextMode,
    outcome: nodeResult?.outcome ?? "failed",
    extras: nodeResult?.extras ?? {},
    failure_class: isInfraError(result) ? "infra" : failureClassOf(result, nodeResult !== null),
    exit_code: result.exitCode,
    usage,
    cost_usd: cost.usd,
    cost_basis: cost.basis,
    wall_ms: result.wallMs,
    head_sha_before: headBefore,
    head_sha_after: headAfter,
    pushed: headAfter !== headBefore,
    ci: null,
    prompt_sha256_verbatim: built.sha256Verbatim,
    prompt_sha256_sent: built.sha256Sent,
    prompts_lore_sha: readFileSync(join(paths.promptsDir, "LORE_SHA"), "utf8").trim(),
    cli_version: await deps.cliVersion(plan.choice.harness),
    started_at: startedAt.toISOString(),
  };

  writeFileSync(join(plan.visitDir, "record.json"), JSON.stringify(record, null, 2));

  return record;
}

// Credentials, quota or the vendor's API failing: not the model's doing, so the loop stops and the cell stays unrun.
const INFRA_ERROR = /invalid_grant|invalid_rapt|reauth|API key not valid|invalid_api_key|401 Unauthorized|RESOURCE_EXHAUSTED|429 Too Many Requests|requires a newer version of Codex|Credit balance is too low|authentication_error/;

export function isInfraError(result: Pick<SpawnResult, "stdout" | "stderr" | "exitCode">): boolean {
  return result.exitCode !== 0 && INFRA_ERROR.test(`${result.stdout.slice(-20_000)}\n${result.stderr.slice(-20_000)}`);
}

function failureClassOf(result: SpawnResult, hasResultLine: boolean): StationRunRecord["failure_class"] {
  if (result.timedOut) {
    return "timeout";
  }
  if (result.exitCode === null) {
    return "spawn_error";
  }
  if (!hasResultLine) {
    return result.exitCode === 0 ? "no_result_line" : "nonzero_exit";
  }

  return "none";
}

export function loreServer(config: ExperimentConfig) {
  const mcp = config.lore_mcp;

  if (!mcp) {
    throw new Error("context_mode lore-mcp needs a lore_mcp block in the experiment file");
  }
  const apiUrl = process.env[mcp.api_url_env] ?? gitConfig("lore.api-url");
  const token = process.env[mcp.token_env] ?? gitConfig("lore.ingest-token");

  if (!apiUrl || !token) {
    throw new Error(`context_mode lore-mcp needs ${mcp.api_url_env} and ${mcp.token_env} in the environment, or lore.api-url and lore.ingest-token in git config`);
  }

  return loreStdioServer(mcp.lore_dir, apiUrl, token);
}

// Where install.sh keeps them.
function gitConfig(key: string): string | undefined {
  try {
    return execFileSync("git", ["config", "--get", key], { encoding: "utf8" }).trim() || undefined;
  } catch {
    return undefined;
  }
}
