// One loop: the workspace, the stations the routing asks for, a local CI verdict between rounds, and the cell folder that remains.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExperimentConfig } from "../config/experiment.js";
import type { Station } from "../core/harness-names.js";
import { cellPath, type PlannedLoop } from "../core/matrix.js";
import { parseNumstat, structuralMetrics } from "../core/metrics.js";
import type { LoopRecord, StationRunRecord } from "../core/records.js";
import { ciFeedbackOf, handoffOf, roundBriefOf, type RoundHandoff } from "../core/round-brief.js";
import { initialState, nextStep, type EndReason, type LoopState, type Step } from "../core/routing.js";
import { EMPTY_USAGE, type Usage } from "../core/usage.js";
import { runSubjectCi } from "../workspace/ci.js";
import { cachedNodeModulesDir } from "../workspace/deps-cache.js";
import { diffOf, git, numstat } from "../workspace/git.js";
import { prepareRunWorkspace, pushedHead, type RunWorkspace } from "../workspace/prepare.js";
import { cliVersion } from "./cli-version.js";
import type { BenchPaths } from "./paths.js";
import { appendRecord, writeLoopJson } from "./results.js";
import { HarnessLanes, UNLIMITED } from "./harness-lanes.js";
import { runStation, type StationPlan } from "./station.js";

export interface LoopDeps {
  config: ExperimentConfig;
  paths: BenchPaths;
  log: (line: string) => void;
  /** Keep runs/<loop_id> after the loop (default: delete it once the cell folder is written). */
  keepRun?: boolean;
  lanes?: HarnessLanes;
}

export async function runLoop(planned: PlannedLoop, deps: LoopDeps): Promise<LoopRecord> {
  const { config, paths, log } = deps;
  const runDir = join(paths.runsDir, planned.loop_id);
  const cellDir = join(paths.resultsDir, cellPath(planned));
  const startedAt = new Date();

  rmSync(runDir, { recursive: true, force: true });
  mkdirSync(runDir, { recursive: true });
  mkdirSync(cellDir, { recursive: true });
  const artifact = planned.entry === "dod" ? null : referenceArtifact(paths, config.id, planned.ticket.number, planned.entry);
  const nodeModules = cachedNodeModulesDir(join(paths.cacheDir, config.id), planned.ticket.base_sha);
  const workspace = await prepareRunWorkspace({
    runDir,
    mirrorDir: config.subject.mirror_dir,
    baseSha: planned.ticket.base_sha,
    branch: `loop-bench/${planned.ticket.number}`,
    ticketMarkdown: readFileSync(join(paths.root, "experiments", planned.ticket.ticket_file), "utf8"),
    nodeModulesDir: existsSync(nodeModules) ? nodeModules : null,
    branchBundle: artifact?.bundle ?? null,
    roundBrief: artifact?.roundBrief ?? null,
  });
  const visits: StationRunRecord[] = [];
  let state: LoopState = initialState(planned.entry);
  let step: Step = { kind: "run", station: planned.entry };
  let handoff: RoundHandoff | null = null;
  let visitIndex = 0;

  while (step.kind !== "done") {
    if (step.kind === "run") {
      visitIndex += 1;
      const station: Station = step.station;
      const plan: StationPlan = {
        experimentId: config.id,
        loopId: planned.loop_id,
        ticket: planned.ticket,
        station,
        choice: planned.assignments[station],
        promptVariant: planned.varied_station === station || planned.mode !== "ofat" ? planned.prompt_variant : "baseline",
        contextMode: planned.context_mode,
        round: state.rounds,
        attempt: state.attempts[station],
        visitDir: join(cellDir, "stations", `${String(visitIndex).padStart(2, "0")}-${station}-r${state.rounds}-a${state.attempts[station]}`),
        homeDir: join(runDir, `home-${visitIndex}`),
      };

      log(`[${planned.loop_id}] ${station} ${plan.choice.harness}/${plan.choice.model} round ${state.rounds} attempt ${state.attempts[station]}`);
      const record = await (deps.lanes ?? UNLIMITED).run(plan.choice.harness, () => runStation(plan, { config, paths, workspace, cliVersion }));

      visits.push(record);
      appendRecord(paths.resultsDir, config.id, record);
      if (record.failure_class === "infra") {
        throw new InfraError(`${station} on ${plan.choice.harness}/${plan.choice.model} hit an infrastructure error; see ${plan.visitDir}/stderr.log. The cell is left unrun.`);
      }
      handoff = handoffOf(record.extras) ?? handoff;
      log(`[${planned.loop_id}]   -> ${record.outcome} (${record.failure_class}) $${record.cost_usd.toFixed(3)} ${Math.round(record.wall_ms / 1000)}s pushed=${record.pushed}`);
      ({ state, step } = nextStep(state, { kind: "agent", station, outcome: record.outcome }));
      continue;
    }
    const verdict = await runSubjectCi({
      originDir: workspace.originDir,
      branch: workspace.branch,
      checkoutDir: join(runDir, `ci-${visitIndex}`),
      nodeModulesDir: existsSync(nodeModules) ? nodeModules : null,
      checks: config.subject.ci_checks,
    });
    const lastVisit = visits.at(-1);

    if (lastVisit) {
      lastVisit.ci = { green: verdict.green, failed_checks: verdict.checks.filter((check) => !check.passed).map((check) => check.name), head_sha: verdict.headSha, wall_ms: verdict.wallMs };
      writeFileSync(join(visitDirOf(cellDir, visitIndex, lastVisit), "record.json"), JSON.stringify(lastVisit, null, 2));
      writeFileSync(join(visitDirOf(cellDir, visitIndex, lastVisit), "ci-verdict.json"), JSON.stringify(verdict, null, 2));
      appendRecord(paths.resultsDir, config.id, lastVisit);
    }
    log(`[${planned.loop_id}]   CI on ${verdict.headSha.slice(0, 8)}: ${verdict.green ? "green" : `red (${verdict.checks.filter((c) => !c.passed).map((c) => c.name).join(", ")})`}`);
    const feedback = ciFeedbackOf(verdict.headSha, verdict.checks);

    if (feedback) {
      writeFileSync(workspace.roundBriefPath, roundBriefOf({ feedback, handoff }));
    } else {
      rmSync(workspace.roundBriefPath, { force: true });
    }
    ({ state, step } = nextStep(state, { kind: "ci", green: verdict.green, headSha: verdict.headSha }));
  }

  const record = await loopRecord(planned, config, cellDir, workspace, visits, state, step.reason, startedAt);

  writeLoopJson(cellDir, record);
  appendRecord(paths.resultsDir, config.id, record);
  await keepBranch(workspace, cellDir, planned.ticket.base_sha);
  if (!deps.keepRun) {
    rmSync(runDir, { recursive: true, force: true });
  }
  log(`[${planned.loop_id}] done: ${record.end_reason} rounds=${record.rounds} $${record.total_cost_usd.toFixed(2)} ${Math.round(record.total_wall_ms / 60000)}min -> ${cellDir}`);

  return record;
}

function visitDirOf(cellDir: string, index: number, visit: StationRunRecord): string {
  return join(cellDir, "stations", `${String(index).padStart(2, "0")}-${visit.station}-r${visit.round}-a${visit.attempt}`);
}

async function loopRecord(
  planned: PlannedLoop,
  config: ExperimentConfig,
  cellDir: string,
  workspace: RunWorkspace,
  visits: readonly StationRunRecord[],
  state: LoopState,
  reason: EndReason,
  startedAt: Date,
): Promise<LoopRecord> {
  const finalHead = await pushedHead(workspace);
  const testFile = new RegExp(config.subject.test_file_pattern);
  const candidate = finalHead ? parseNumstat(await numstat(workspace.targetDir, planned.ticket.base_sha, finalHead)) : [];
  const reference = parseNumstat(await numstat(config.subject.mirror_dir, planned.ticket.base_sha, planned.ticket.merge_sha));

  return {
    kind: "loop",
    experiment_id: config.id,
    loop_id: planned.loop_id,
    cell_path: cellPath(planned),
    ticket: planned.ticket.number,
    mode: planned.mode,
    varied_station: planned.varied_station,
    assignments: planned.assignments,
    prompt_variant: planned.prompt_variant,
    context_mode: planned.context_mode,
    replicate: planned.replicate,
    end_reason: reason,
    rounds: state.rounds,
    repairs: state.repairs,
    reached_green: reason === "green",
    total_cost_usd: visits.reduce((sum, visit) => sum + visit.cost_usd, 0),
    total_wall_ms: visits.reduce((sum, visit) => sum + visit.wall_ms + (visit.ci?.wall_ms ?? 0), 0),
    total_usage: visits.reduce(sumUsage, EMPTY_USAGE),
    structural: finalHead ? structuralMetrics(candidate, reference, testFile) : null,
    dod_check: null,
    judge: null,
    final_head_sha: finalHead,
    started_at: startedAt.toISOString(),
    finished_at: new Date().toISOString(),
  };
}

function sumUsage(total: Usage, visit: StationRunRecord): Usage {
  const usage = visit.usage;

  return {
    input_tokens: total.input_tokens + usage.input_tokens,
    output_tokens: total.output_tokens + usage.output_tokens,
    cache_read_tokens: total.cache_read_tokens + usage.cache_read_tokens,
    cache_write_tokens: total.cache_write_tokens + usage.cache_write_tokens,
    reasoning_tokens: total.reasoning_tokens + usage.reasoning_tokens,
    reported_cost_usd: usage.reported_cost_usd === null ? total.reported_cost_usd : (total.reported_cost_usd ?? 0) + usage.reported_cost_usd,
    reported_duration_ms: usage.reported_duration_ms === null ? total.reported_duration_ms : (total.reported_duration_ms ?? 0) + usage.reported_duration_ms,
    tool_calls: usage.tool_calls === null ? total.tool_calls : (total.tool_calls ?? 0) + usage.tool_calls,
  };
}

/** The branch as the loop left it, kept as a bundle and a patch in the cell folder. */
async function keepBranch(workspace: RunWorkspace, cellDir: string, baseSha: string): Promise<void> {
  const head = await pushedHead(workspace);

  if (!head) {
    return;
  }
  await git(["bundle", "create", join(cellDir, "branch.bundle"), `${workspace.branch}`], workspace.originDir);
  writeFileSync(join(cellDir, "diff.patch"), await diffOf(workspace.targetDir, baseSha, head));
  try {
    writeFileSync(join(cellDir, "dod.md"), await git(["show", `${head}:.lore/dod.md`], workspace.targetDir));
  } catch {
    // no dod.md on the branch
  }
}

/** Where a varied tdd-round or repair-build starts from: the reference branch an earlier loop left, chosen with make-artifact. */
export function referenceArtifact(paths: BenchPaths, experimentId: string, ticket: number, entry: Station): { bundle: string; roundBrief: string | null } {
  const kind = entry === "tdd-round" ? "dod" : "red";
  const dir = join(paths.artifactsDir, experimentId, String(ticket), kind);
  const bundle = join(dir, "branch.bundle");

  if (!existsSync(bundle)) {
    throw new Error(`no ${kind} artifact for ticket ${ticket}: run make-artifact --ticket ${ticket} --kind ${kind} --from-cell <cell dir> first (${bundle})`);
  }
  const brief = join(dir, "round-brief.md");

  return { bundle, roundBrief: existsSync(brief) ? readFileSync(brief, "utf8") : null };
}

export class InfraError extends Error {}
