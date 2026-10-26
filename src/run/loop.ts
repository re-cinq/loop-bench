// One loop: the workspace, the stations the routing asks for, a local CI verdict between rounds, and the cell folder that remains.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExperimentConfig } from "../config/experiment.js";
import type { Harness, Station } from "../core/harness-names.js";
import { cellPath, type PlannedLoop } from "../core/matrix.js";
import { loopTotals } from "../core/loop-totals.js";
import { parseNumstat, structuralMetrics } from "../core/metrics.js";
import type { LoopRecord, StationRunRecord } from "../core/records.js";
import { ciFeedbackOf, handoffOf, roundBriefOf, type RoundHandoff } from "../core/round-brief.js";
import { cutBeforeOtherStations, initialState, nextStep, type EndReason, type LoopState, type Step } from "../core/routing.js";
import { runSubjectCi } from "../workspace/ci.js";
import { cachedDeps } from "../workspace/deps-cache.js";
import { subjectEnv } from "../config/experiment.js";
import { diffOf, git, numstat } from "../workspace/git.js";
import { prepareRunWorkspace, pushedHead, type RunWorkspace } from "../workspace/prepare.js";
import { cliVersion } from "./cli-version.js";
import type { BenchPaths } from "./paths.js";
import { appendRecord, archiveReplacedCell, writeLoopJson } from "./results.js";
import { HarnessLanes, UNLIMITED } from "./harness-lanes.js";
import { runStation, type StationPlan } from "./station.js";

export interface LoopDeps {
  config: ExperimentConfig;
  paths: BenchPaths;
  log: (line: string) => void;
  /** Keep runs/<loop_id> after the loop (default: delete it once the cell folder is written). */
  keepRun?: boolean;
  lanes?: HarnessLanes;
  /** CLIs the loop must not start: it ends, as `excluded_harness`, before the first step assigned to one. */
  excludedHarnesses?: readonly Harness[];
}

export async function runLoop(planned: PlannedLoop, deps: LoopDeps): Promise<LoopRecord> {
  const { config, paths, log } = deps;
  const runDir = join(paths.runsDir, planned.loop_id);
  const cellDir = join(paths.resultsDir, cellPath(planned));
  const startedAt = new Date();

  rmSync(runDir, { recursive: true, force: true });
  mkdirSync(runDir, { recursive: true });
  const replaced = archiveReplacedCell(paths, cellPath(planned), startedAt);
  if (replaced) {
    log(`[loop-bench] kept what an earlier run left in ${cellPath(planned)} at ${replaced}`);
  }
  mkdirSync(cellDir, { recursive: true });
  const artifact = planned.entry === "dod" ? null : referenceArtifact(paths, config.id, planned.ticket.number, planned.entry);
  const nodeModules = cachedDeps(join(paths.cacheDir, config.id), planned.ticket.base_sha) ?? "";
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
    if (step.kind === "run" && (deps.excludedHarnesses ?? []).includes(planned.assignments[step.station].harness)) {
      log(`[${planned.loop_id}] stops before ${step.station}: ${planned.assignments[step.station].harness} is excluded`);
      step = { kind: "done", reason: "excluded_harness" };
      break;
    }
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

      log(`[${planned.loop_id}] ${station} ${plan.choice.harness}/${plan.choice.model} round ${state.rounds} attempt ${state.attempts[station]}: waiting for a ${plan.choice.harness} lane`);
      const record = await (deps.lanes ?? UNLIMITED).run(plan.choice.harness, () => {
        log(`[${planned.loop_id}] ${station} ${plan.choice.harness}/${plan.choice.model} started`);

        return runStation(plan, { config, paths, workspace, cliVersion });
      });

      visits.push(record);
      appendRecord(paths.resultsDir, config.id, record);
      stopOnInfraError(record.failure_class, `${station} on ${plan.choice.harness}/${plan.choice.model}`, plan.visitDir);
      handoff = handoffOf(record.extras) ?? handoff;
      log(`[${planned.loop_id}]   -> ${record.outcome} (${record.failure_class}) $${record.cost_usd.toFixed(3)} ${Math.round(record.wall_ms / 1000)}s pushed=${record.pushed}`);
      ({ state, step } = nextStep(state, { kind: "agent", station, outcome: record.outcome }));
      step = cutBeforeOtherStations(step, planned.varied_station);
      continue;
    }
    const verdict = await runSubjectCi({
      originDir: workspace.originDir,
      branch: workspace.branch,
      checkoutDir: join(runDir, `ci-${visitIndex}`),
      nodeModulesDir: existsSync(nodeModules) ? nodeModules : null,
      checks: config.subject.ci_checks,
      env: subjectEnv(config),
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

    rmSync(workspace.roundBriefPath, { force: true });
    if (feedback) {
      writeFileSync(workspace.roundBriefPath, roundBriefOf({ feedback, handoff }));
    }
    ({ state, step } = nextStep(state, { kind: "ci", green: verdict.green, headSha: verdict.headSha }));
    step = cutBeforeOtherStations(step, planned.varied_station);
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
    ...loopTotals(visits),
    structural: finalHead ? structuralMetrics(candidate, reference, testFile) : null,
    dod_check: null,
    judge: null,
    final_head_sha: finalHead,
    started_at: startedAt.toISOString(),
    finished_at: new Date().toISOString(),
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

function stopOnInfraError(failureClass: string, who: string, visitDir: string): void {
  if (failureClass === "infra") {
    throw new InfraError(`${who} hit an infrastructure error; see ${visitDir}/stderr.log. The cell is left unrun.`);
  }
}
