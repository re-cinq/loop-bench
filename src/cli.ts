// loop-bench: replay the implementation loop's agent stations across harnesses, models, contexts and prompts.
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { parseArgs } from "node:util";
import { loadExperiment, subjectEnv, type ExperimentConfig } from "./config/experiment.js";
import { analyzeTranscript } from "./core/analyze.js";
import type { TicketSize } from "./core/model-stats.js";
import { runFactsOf, type Visit as RunVisit, type VisitAnalysis } from "./core/test-facts.js";
import type { BenchRecord, LoopRecord, StationRunRecord } from "./core/records.js";
import { ciFeedbackOf, handoffOf, roundBriefOf, type CheckResult } from "./core/round-brief.js";
import { diffOf, git } from "./workspace/git.js";
import { normalizedDiff, prettierBinIn } from "./run/normalize-diff.js";
import { ensureSitePrettier } from "./run/site-deps.js";
import { finishedLoopsOnDisk, parseShard, ranDod, toDodCheck, toJudge } from "./run/score-missing.js";
import { enforce } from "./core/enforce.js";
import { cutCell, planCellCut } from "./run/truncate-cell.js";
import { ContextModeSchema, HarnessSchema, StationSchema, type ContextMode, type Harness, type Station } from "./core/harness-names.js";
import { cellPath, plannedLoops, type PlannedLoop } from "./core/matrix.js";
import { breadthFirst } from "./core/order.js";
import { costOf } from "./core/pricing.js";
import { modelStatsOf } from "./core/model-stats.js";
import { renderReport, type PendingCell } from "./core/report.js";
import { siteDataOf } from "./core/site-data.js";
import { effortLabel } from "./core/effort.js";
import { finalText, parseNodeResult } from "./core/result-line.js";
import { usageFromStream } from "./core/usage.js";
import { ADAPTERS } from "./harness/adapters.js";
import { buildScratchHome } from "./harness/scratch-home.js";
import { runProcess } from "./io/spawn.js";
import { InfraError, runLoop } from "./run/loop.js";
import { ancestorInstructionFiles } from "./run/isolation.js";
import { HarnessLanes } from "./run/harness-lanes.js";
import { mcpFor } from "./run/station.js";
import { benchPaths } from "./run/paths.js";
import { propose, type ProposalEvidence } from "./run/propose.js";
import { appendRecord, latestLoops, latestStationRuns, readLoopJson, readRecords, writeLoopJson } from "./run/results.js";
import { scoreDod, scoreJudge, withScores } from "./run/score.js";
import { collectJudgeBatches, judgeBatchStatus, submitJudgeBatch } from "./run/judge-batch.js";
import { cachedNodeModulesDir, ensureDepsCache } from "./workspace/deps-cache.js";

const ROOT = join(import.meta.dirname, "..");
const paths = benchPaths(ROOT);
const log = (line: string): void => void process.stderr.write(`${line}\n`);

const USAGE = `loop-bench <command> [options]

  plan        --experiment <file> [filters]   list the loops a run would start, with their cell folders
  prepare     --experiment <file>             install dependencies once per ticket base commit
  smoke       --harness <h> --model <m>        one tiny run under a scratch HOME: auth, stream parsing, cost
  run         --experiment <file> [filters]   run loops and their dod check; skips cells whose loop.json exists (use --force); no judge
  make-artifact --experiment <file> --ticket <n> --kind dod|red --from-cell <dir>
  truncate    --experiment <file> [--ticket <n>] [--apply]   cut finished one-station cells where a loop varying that station now ends (dry run without --apply)
  score       --experiment <file> [filters]   dod red/green check + judge on finished loops
  score --missing [--shard i/n]               judge only the finished loops that have no judge score, found on disk
  score --missing-dod [--shard i/n]           dod check only, for finished loops that ran a dod station and have none
  score --batch submit|status|collect [--limit n]  judge those loops as one Vertex batch job (needs judge.batch in the experiment file)
  analyze     --experiment <file>             transcript metrics per station visit -> analysis.json
  propose     --experiment <file> --station <s> [--worst 5]
  report      --experiment <file> [--site-url <url>]  rewrite results/<experiment>/REPORT.md, a short plain-language summary, and print it (the url can also come from LOOP_BENCH_SITE_URL)
  site        --experiment <file>             write the results website's data to site/data/
  site-deps   --experiment <file>             install the prettier each ticket's base commit pins (what CI needs for the site)
  run ... --parallel <n>                      run n loops at a time (default 1)
  run ... --per-harness <n>                   at most n agent runs per CLI at a time, across all loops
  run ... --exclude claude[,gemini]          end a loop before any step assigned to these CLIs

filters: --ticket <n> --station <dod|tdd-round|repair-build|baseline|whole_loop> --agent <harness/model>
         --context <none|lore-mcp> --prompt <variant> --replicates <n> --limit <n>`;

async function main(argv: readonly string[]): Promise<void> {
  const [command, ...rest] = argv;
  const { values } = parseArgs({
    args: rest,
    options: {
      experiment: { type: "string", default: join(ROOT, "experiments", "halengine.yaml") },
      ticket: { type: "string" },
      station: { type: "string" },
      agent: { type: "string" },
      context: { type: "string" },
      prompt: { type: "string" },
      replicates: { type: "string" },
      limit: { type: "string" },
      harness: { type: "string" },
      model: { type: "string" },
      kind: { type: "string" },
      "from-cell": { type: "string" },
      worst: { type: "string", default: "5" },
      force: { type: "boolean", default: false },
      "keep-run": { type: "boolean", default: false },
      parallel: { type: "string", default: "1" },
      "per-harness": { type: "string" },
      exclude: { type: "string" },
      missing: { type: "boolean", default: false },
      "missing-dod": { type: "boolean", default: false },
      apply: { type: "boolean", default: false },
      shard: { type: "string" },
      batch: { type: "string" },
      "site-url": { type: "string" },
    },
  });
  const config = (): ExperimentConfig => loadExperiment(values.experiment);
  const selected = (): PlannedLoop[] => filterLoops(plannedLoops(config()), values);

  switch (command) {
    case "plan":
      return void process.stdout.write(selected().map((loop) => `${loop.loop_id}  ${cellPath(loop)}\n`).join(""));
    case "prepare":
      return prepare(config());
    case "smoke":
      return smoke(config(), values.harness, values.model, ContextModeSchema.parse(values.context ?? "none"));
    case "run":
      return runSelected(config(), breadthFirst(selected()), values.force, values["keep-run"], Number(values.parallel), values["per-harness"] === undefined ? undefined : new HarnessLanes(Number(values["per-harness"])), (values.exclude?.split(",") ?? []).map((harness) => HarnessSchema.parse(harness)));
    case "make-artifact":
      return makeArtifact(config(), values.ticket, values.kind, values["from-cell"]);
    case "score":
      if (values.batch) {
        return scoreInBatch(config(), values.batch, values.limit === undefined ? undefined : Number(values.limit));
      }
      if (values["missing-dod"]) {
        return scoreMissingDods(config(), values.shard);
      }
      return values.missing ? scoreMissingJudges(config(), values.shard) : scoreSelected(config(), selected(), { dod: "always", judge: true });
    case "truncate":
      return truncateCells(config(), values.ticket, values.apply);
    case "analyze":
      return void analyzeAll(config());
    case "propose":
      return proposeFor(config(), values.station, Number(values.worst));
    case "report":
      return void process.stdout.write(writeReport(config(), values["site-url"]));
    case "site":
      return writeSiteData(config());
    case "site-deps":
      return void (await ensureSitePrettier(config(), paths.cacheDir)).forEach((result) => log(`[loop-bench] #${result.ticket} prettier: ${result.status}${result.version ? ` ${result.version}` : ""}`));
    default:
      process.stdout.write(`${USAGE}\n`);
  }
}

interface Filters {
  ticket?: string | undefined;
  station?: string | undefined;
  agent?: string | undefined;
  context?: string | undefined;
  prompt?: string | undefined;
  replicates?: string | undefined;
  limit?: string | undefined;
}

function filterLoops(loops: readonly PlannedLoop[], filters: Filters): PlannedLoop[] {
  const matching = loops.filter((loop) => {
    const station = loop.varied_station ?? loop.mode;
    const choice = loop.varied_station ? loop.assignments[loop.varied_station] : loop.assignments.dod;

    return (
      (filters.ticket === undefined || String(loop.ticket.number) === filters.ticket) &&
      (filters.station === undefined || filters.station.split(",").includes(station)) &&
      (filters.agent === undefined || filters.agent.split(",").includes(`${choice.harness}/${choice.model}`)) &&
      (filters.context === undefined || loop.context_mode === filters.context) &&
      (filters.prompt === undefined || loop.prompt_variant === filters.prompt) &&
      (filters.replicates === undefined || loop.replicate <= Number(filters.replicates))
    );
  });

  return filters.limit === undefined ? matching : matching.slice(0, Number(filters.limit));
}

async function prepare(config: ExperimentConfig): Promise<void> {
  for (const ticket of config.tickets) {
    const dir = await ensureDepsCache({ cacheDir: join(paths.cacheDir, config.id), mirrorDir: config.subject.mirror_dir, baseSha: ticket.base_sha, installCommand: config.subject.install_command, layout: config.subject.deps_layout, env: subjectEnv(config) });

    log(`[loop-bench] #${ticket.number} dependencies at ${dir}`);
  }
}

async function smoke(config: ExperimentConfig, harness: string | undefined, model: string | undefined, context: ContextMode): Promise<void> {
  const withLore = context !== "none";
  const parsedHarness = HarnessSchema.parse(harness);

  enforce(model !== undefined, "smoke needs --model");
  const dir = join(paths.runsDir, `smoke-${parsedHarness}-${Date.now()}`);
  const workspaceDir = join(dir, "workspace");

  mkdirSync(workspaceDir, { recursive: true });
  const spec = {
    model,
    prompt: withLore
      ? "Call the Lore MCP tool lore_search_context with repo re-cinq/HALEngine and query \"afterModelResponse usage across tool rounds\". Reply with the number of results and the source path of the first one, then try to call lore_write_memory with key loop-bench/smoke-write-probe and value test and say whether it was available. End with the line: LORE_NODE_RESULT: success"
      : "Run the shell command `npm test` in this directory, then reply with exactly one line: LORE_NODE_RESULT: success",
    workspaceDir,
    homeDir: join(dir, "home"),
    mcp: mcpFor(context, config, paths),
    extraEnv: {},
    gemini: config.gemini ?? null,
    userHome: process.env["HOME"] ?? "",
  };
  const adapter = ADAPTERS[parsedHarness];

  writeFileSync(join(workspaceDir, "package.json"), JSON.stringify({ name: "smoke", scripts: { test: "echo SMOKE_TEST_RAN" } }));
  buildScratchHome({ spec, adapter, promptsDir: paths.promptsDir, skills: ["lore-context"] });
  const result = await runProcess({ ...adapter.command(spec), timeoutMs: 5 * 60_000, stdoutPath: join(dir, "stdout.jsonl"), stderrPath: join(dir, "stderr.log") });
  const usage = usageFromStream(parsedHarness, result.stdout);
  const text = finalText(parsedHarness, result.stdout);

  process.stdout.write(
    `${JSON.stringify(
      {
        harness: parsedHarness,
        model,
        exit_code: result.exitCode,
        wall_ms: result.wallMs,
        result: parseNodeResult(text),
        guard_blocked_npm_test: result.stdout.includes("[lore] blocked"),
        npm_test_ran: result.stdout.includes("SMOKE_TEST_RAN"),
        final_text: text.slice(-300),
        lore_tool_calls: analyzeTranscript(parsedHarness, result.stdout).lore_calls,
        usage,
        cost: costOf(parsedHarness, model, usage),
        stderr_tail: result.stderr.slice(-600),
        dir,
      },
      null,
      2,
    )}\n`,
  );
}

async function runSelected(config: ExperimentConfig, loops: readonly PlannedLoop[], force: boolean, keepRun: boolean, parallel: number, lanes?: HarnessLanes, excludedHarnesses: readonly Harness[] = []): Promise<void> {
  const leaks = ancestorInstructionFiles(paths.runsDir);

  enforce(leaks.length === 0, `agents would load these instruction files from above ${paths.runsDir}: ${leaks.join(", ")}. Set LOOP_BENCH_RUNS to a folder outside your home.`);
  const pending = loops.filter((loop) => force || !readLoopJson(join(paths.resultsDir, cellPath(loop))));
  let next = 0;
  let stopped = false;

  log(`[loop-bench] ${loops.length} loops selected, ${pending.length} not yet run, ${parallel} at a time`);
  const worker = async (): Promise<void> => {
    while (!stopped && next < pending.length) {
      const index = next++;
      const loop = pending[index];

      if (!loop) {
        return;
      }
      log(`[loop-bench] ${index + 1}/${pending.length} ${cellPath(loop)}`);
      try {
        await runLoop(loop, { config, paths, log, keepRun, excludedHarnesses, ...(lanes ? { lanes } : {}) });
        await scoreSelected(config, [loop], AFTER_RUN);
        // Only this loop's visits: every visit's transcript (over a GB) took minutes, with the event loop blocked the whole time.
        analyzeVisits(recordDirsUnder(join(paths.resultsDir, cellPath(loop))));
        writeReport(config);
      } catch (error) {
        if (error instanceof InfraError) {
          stopped = true;
          log(`[loop-bench] stopping: ${error.message}`);

          return;
        }
        log(`[loop-bench] ${cellPath(loop)} errored: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.max(1, parallel) }, worker));
}

/**
 * The branch a varied station starts from, cut from a finished cell at the right commit:
 * `dod`, the commit the dod visit pushed (acceptance tests, no implementation), for tdd-round;
 * `red`, the first commit CI judged red, with the round brief that verdict produced, for repair-build.
 */
async function makeArtifact(config: ExperimentConfig, ticket: string | undefined, kind: string | undefined, cellArgument: string | undefined): Promise<void> {
  enforce(ticket !== undefined && (kind === "dod" || kind === "red") && cellArgument !== undefined, "make-artifact needs --ticket, --kind dod|red and --from-cell");
  const fromCell = resolve(cellArgument);
  const bundle = join(fromCell, "branch.bundle");

  enforce(existsSync(bundle), `${bundle} does not exist: the cell's loop pushed nothing`);
  const visits = readdirSync(join(fromCell, "stations"))
    .sort()
    .map((visit) => join(fromCell, "stations", visit))
    .map((dir) => ({ dir, record: JSON.parse(readFileSync(join(dir, "record.json"), "utf8")) as StationRunRecord }));
  const cut = kind === "dod" ? dodCut(visits) : redCut(visits);

  enforce(cut !== null, kind === "dod" ? `no dod visit pushed in ${fromCell}` : `no red CI verdict in ${fromCell}: pick a cell whose loop went red at least once`);
  const dir = join(paths.artifactsDir, config.id, ticket, kind);
  const work = join(paths.runsDir, `artifact-${Date.now()}`);
  const branch = `loop-bench/${ticket}`;

  mkdirSync(dir, { recursive: true });
  mkdirSync(work, { recursive: true });
  await git(["clone", "--quiet", "--bare", bundle, join(work, "repo.git")], work);
  await git(["update-ref", `refs/heads/${branch}`, cut.sha], join(work, "repo.git"));
  await git(["bundle", "create", join(dir, "branch.bundle"), branch], join(work, "repo.git"));
  rmSync(work, { recursive: true, force: true });
  if (cut.brief) {
    writeFileSync(join(dir, "round-brief.md"), cut.brief);
  }
  writeFileSync(join(dir, "SOURCE"), `${relative(ROOT, fromCell)} at ${cut.sha}\n`);
  log(`[loop-bench] ${kind} artifact for #${ticket}: ${cut.sha.slice(0, 8)} from ${fromCell}`);
}

interface Visit {
  dir: string;
  record: StationRunRecord;
}

function dodCut(visits: readonly Visit[]): { sha: string; brief: null } | null {
  const dod = visits.find((visit) => visit.record.station === "dod" && visit.record.outcome === "success" && visit.record.pushed);

  return dod ? { sha: dod.record.head_sha_after, brief: null } : null;
}

function redCut(visits: readonly Visit[]): { sha: string; brief: string } | null {
  for (const visit of visits) {
    const verdictPath = join(visit.dir, "ci-verdict.json");

    if (!existsSync(verdictPath)) {
      continue;
    }
    const verdict = JSON.parse(readFileSync(verdictPath, "utf8")) as { green: boolean; headSha: string; checks: CheckResult[] };
    const feedback = verdict.green ? null : ciFeedbackOf(verdict.headSha, verdict.checks);

    if (feedback) {
      return { sha: verdict.headSha, brief: roundBriefOf({ feedback, handoff: handoffOf(visit.record.extras) }) };
    }
  }

  return null;
}

/** Which scores to (re)compute: the dod check always or only where it is missing, and whether to call the judge. */
interface ScoringSteps {
  dod: "always" | "if-missing";
  judge: boolean;
}

/** A run scores the dod check and leaves the judge to a later backfill (`score --missing` or `score --batch`). */
const AFTER_RUN: ScoringSteps = { dod: "always", judge: false };

async function scoreOne(config: ExperimentConfig, ticket: { number: number; title: string; ticket_file: string; base_sha: string; merge_sha: string; reference_pr: number }, cellDir: string, record: LoopRecord, steps: ScoringSteps): Promise<void> {
  const dodCheck =
    ranDod(record) && !(steps.dod === "if-missing" && record.dod_check !== null)
      ? await scoreDod({ config, paths, ticket, cellDir, testCommand: (files) => `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath ${files.map((file) => `'${file}'`).join(" ")}` })
      : null;
  const judge = steps.judge ? await scoreJudge({ config, paths, ticket, cellDir }) : null;
  const scored = withScores(record, dodCheck, judge);

  writeLoopJson(cellDir, scored);
  appendRecord(paths.resultsDir, config.id, scored);
  const unjudged = steps.judge ? "—" : "later";

  log(`[loop-bench] scored ${relative(paths.resultsDir, cellDir)}: dod ${dodCheck ? `red=${dodCheck.red_on_base} green=${dodCheck.green_with_reference}` : "kept"}, judge ${judge ? `${judge.correctness}/${judge.completeness_vs_ticket}/${judge.closeness_to_reference}` : unjudged}`);
}

async function scoreSelected(config: ExperimentConfig, loops: readonly PlannedLoop[], steps: ScoringSteps): Promise<void> {
  for (const loop of loops) {
    const cellDir = join(paths.resultsDir, cellPath(loop));
    const record = readLoopJson(cellDir);

    if (record) {
      await scoreOne(config, loop.ticket, cellDir, record, steps);
    }
  }
}

/** Judges every finished loop that has no judge score, found on disk, optionally one shard of them: for loops that finished while a login was out or came from another machine. */
async function scoreMissingJudges(config: ExperimentConfig, shardText: string | undefined): Promise<void> {
  const todo = toJudge(finishedLoopsOnDisk(paths.resultsDir, config.id), parseShard(shardText));

  log(`[loop-bench] ${todo.length} loops without a judge score in this shard`);
  await scoreFound(config, todo, { dod: "if-missing", judge: true });
}

/** The dod check, and nothing else, for every finished loop that ran a dod station and has none: loops copied in from a machine that did not score them. */
async function scoreMissingDods(config: ExperimentConfig, shardText: string | undefined): Promise<void> {
  const todo = toDodCheck(finishedLoopsOnDisk(paths.resultsDir, config.id), parseShard(shardText));

  log(`[loop-bench] ${todo.length} loops without a dod check in this shard`);
  await scoreFound(config, todo, { dod: "if-missing", judge: false });
}

async function scoreFound(config: ExperimentConfig, todo: ReadonlyArray<{ cellDir: string; record: LoopRecord }>, steps: ScoringSteps): Promise<void> {
  for (const { cellDir, record } of todo) {
    const ticket = config.tickets.find((candidate) => candidate.number === record.ticket);

    if (!ticket) {
      log(`[loop-bench] no ticket #${record.ticket} in the experiment, skipping ${relative(paths.resultsDir, cellDir)}`);
      continue;
    }
    await scoreOne(config, ticket, cellDir, record, steps);
  }
}

async function scoreInBatch(config: ExperimentConfig, step: string, limit: number | undefined): Promise<void> {
  const context = { config, paths, log, limit };

  switch (step) {
    case "submit":
      return submitJudgeBatch(context);
    case "status":
      return judgeBatchStatus(context);
    case "collect":
      return collectJudgeBatches(context);
    default:
      throw new Error(`--batch takes submit, status or collect, got "${step}"`);
  }
}

async function truncateCells(config: ExperimentConfig, ticketFilter: string | undefined, apply: boolean): Promise<void> {
  const cuts = finishedLoopsOnDisk(paths.resultsDir, config.id)
    .filter(({ record }) => ticketFilter === undefined || String(record.ticket) === ticketFilter)
    .flatMap(({ cellDir, record }) => {
      const planned = planCellCut(cellDir, record);

      return planned ? [{ cellDir, record, ...planned }] : [];
    });
  const at = new Date();

  for (const { cellDir, record, visits, plan } of cuts) {
    const ticket = config.tickets.find((candidate) => candidate.number === record.ticket);

    enforce(ticket !== undefined, `no ticket #${record.ticket} in the experiment for ${relative(paths.resultsDir, cellDir)}`);
    const keptCost = visits.slice(0, plan.kept).reduce((sum, visit) => sum + visit.record.cost_usd, 0);

    log(`[loop-bench] ${record.cell_path}: keep ${plan.kept}/${visits.length} visits, ${record.end_reason} -> ${plan.reason}, $${record.total_cost_usd.toFixed(2)} -> $${keptCost.toFixed(2)}`);
    if (apply) {
      await cutCell({ config, paths, ticket, cellDir, record, visits, plan, at });
    }
  }
  log(`[loop-bench] ${cuts.length} cells ${apply ? "cut; run `score` (dod check) next" : "would be cut; rerun with --apply"}`);
}

function visitDirs(experimentId: string): string[] {
  return recordDirsUnder(join(paths.resultsDir, experimentId));
}

function recordDirsUnder(root: string): string[] {
  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name === "record.json")
    .map((entry) => entry.parentPath);
}

function analyzeAll(config: ExperimentConfig): void {
  analyzeVisits(visitDirs(config.id));
}

function analyzeVisits(dirs: readonly string[]): void {
  for (const dir of dirs.filter((visit) => existsSync(join(visit, "stdout.jsonl")))) {
    const record = JSON.parse(readFileSync(join(dir, "record.json"), "utf8")) as { harness: string; usage: unknown; cost_usd: number; wall_ms: number; outcome: string };
    const harness = HarnessSchema.parse(record.harness);
    const analysis = analyzeTranscript(harness, readFileSync(join(dir, "stdout.jsonl"), "utf8"));

    writeFileSync(join(dir, "analysis.json"), JSON.stringify({ ...analysis, outcome: record.outcome, cost_usd: record.cost_usd, wall_ms: record.wall_ms, usage: record.usage }, null, 2));
  }
  log(`[loop-bench] analyzed ${dirs.length} station visits`);
}

async function proposeFor(config: ExperimentConfig, station: string | undefined, worst: number): Promise<void> {
  const parsedStation: Station = StationSchema.parse(station);
  const visits = visitDirs(config.id)
    .filter((dir) => existsSync(join(dir, "analysis.json")))
    .map((dir) => ({ dir, analysis: JSON.parse(readFileSync(join(dir, "analysis.json"), "utf8")) as { outcome: string; cost_usd: number }, record: JSON.parse(readFileSync(join(dir, "record.json"), "utf8")) as { station: string } }))
    .filter((visit) => visit.record.station === parsedStation)
    .sort((a, b) => Number(a.analysis.outcome === "success") - Number(b.analysis.outcome === "success") || b.analysis.cost_usd - a.analysis.cost_usd)
    .slice(0, worst);

  enforce(visits.length > 0, `no analyzed ${parsedStation} visits: run analyze first`);
  const evidence: ProposalEvidence[] = visits.map((visit) => ({
    cellPath: relative(paths.resultsDir, visit.dir),
    analysis: JSON.stringify(visit.analysis, null, 2),
    finalMessage: existsSync(join(visit.dir, "final-message.md")) ? readFileSync(join(visit.dir, "final-message.md"), "utf8") : "",
  }));

  log(`[loop-bench] proposals written to ${await propose({ config, paths, station: parsedStation, evidence })}`);
}

interface ReportInputs {
  records: BenchRecord[];
  loops: LoopRecord[];
  experimentDir: string;
  promptsLoreSha: string;
  generatedAt: string;
  conclusions: string;
}

function reportInputs(config: ExperimentConfig): ReportInputs {
  const records = repriced(readRecords(paths.resultsDir, config.id));
  const experimentDir = join(paths.resultsDir, config.id);
  const conclusionsPath = join(experimentDir, "conclusions.md");

  return {
    records,
    // A loop discarded by removing its cell folder (an infrastructure failure, say) stays in results.jsonl but leaves the report.
    loops: latestLoops(records).filter((loop) => existsSync(join(paths.resultsDir, loop.cell_path, "loop.json"))),
    experimentDir,
    promptsLoreSha: readFileSync(join(paths.promptsDir, "LORE_SHA"), "utf8").trim(),
    generatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
    conclusions: existsSync(conclusionsPath) ? readFileSync(conclusionsPath, "utf8").trim() : "_No conclusions yet: too few loops have finished._",
  };
}

/** The plain-language summary: runs from the same numbers the website ranks, written beside the experiment's records. */
function writeReport(config: ExperimentConfig, siteUrl: string | null = process.env.LOOP_BENCH_SITE_URL ?? null): string {
  const { records, loops, experimentDir, generatedAt } = reportInputs(config);
  const { runs } = modelStatsOf({ loops, stationRuns: latestStationRuns(records), tiers: ticketSizesOf(config) });
  const markdown = renderReport({ runs, generatedAt, siteUrl });

  mkdirSync(experimentDir, { recursive: true });
  writeFileSync(join(experimentDir, "REPORT.md"), markdown);

  return markdown;
}

/** The website reads the same repriced records as REPORT.md, so the two never disagree; results.jsonl is copied beside it for download. */
async function writeSiteData(config: ExperimentConfig): Promise<void> {
  const { records, loops, experimentDir, promptsLoreSha, generatedAt, conclusions } = reportInputs(config);
  const dataDir = join(ROOT, "site", "data");
  const data = siteDataOf({
    experimentId: config.id,
    subjectRepo: config.subject.repo,
    promptsLoreSha,
    generatedAt,
    conclusions,
    loops,
    pending: pendingCells(config, loops),
    stationRuns: latestStationRuns(records),
    plannedCells: plannedLoops(config),
    tiers: ticketSizesOf(config),
    tickets: config.tickets.map((ticket) => ({ number: ticket.number, title: ticket.title, size: ticket.complexity ?? null })),
  });

  mkdirSync(dataDir, { recursive: true });
  writeFileSync(join(dataDir, "bench.json"), JSON.stringify(data));
  if (existsSync(join(experimentDir, "results.jsonl"))) {
    copyFileSync(join(experimentDir, "results.jsonl"), join(dataDir, "results.jsonl"));
  }
  const ownWork = await writeSiteDiffs(config, loops, join(dataDir, "diffs"));

  writeSiteRuns(loops, ownWork, join(dataDir, "runs"));
  log(`[loop-bench] site data written to ${relative(ROOT, dataDir)}: ${data.cells.length} cells, ${data.lorePairs.length} Lore pairs`);
}

function ticketSizesOf(config: ExperimentConfig): Record<number, TicketSize> {
  return Object.fromEntries(config.tickets.flatMap((ticket) => (ticket.complexity ? [[ticket.number, ticket.complexity]] : [])));
}

/** One small file per run with what its tests and its order of work looked like, fetched by the run and repeats pages only when opened. `ownWork` holds, per coding or build-fix run, the diff from the branch it was handed to where it ended. */
function writeSiteRuns(loops: readonly LoopRecord[], ownWork: ReadonlyMap<string, string>, runsDir: string): void {
  mkdirSync(runsDir, { recursive: true });
  for (const loop of loops) {
    const cellDir = join(paths.resultsDir, loop.cell_path);
    const readIfPresent = (name: string): string | null => (existsSync(join(cellDir, name)) ? readFileSync(join(cellDir, name), "utf8") : null);
    const facts = runFactsOf({ loopId: loop.loop_id, task: loop.varied_station, dodMarkdown: readIfPresent("dod.md"), patch: ownWork.get(loop.loop_id) ?? readIfPresent("diff.patch"), visits: visitsOf(cellDir) });

    writeFileSync(join(runsDir, `${loop.loop_id}.json`), JSON.stringify(facts));
  }
}

function visitsOf(cellDir: string): RunVisit[] {
  const stationsDir = join(cellDir, "stations");

  if (!existsSync(stationsDir)) {
    return [];
  }

  return readdirSync(stationsDir).sort().map((name) => {
    const record = JSON.parse(readFileSync(join(stationsDir, name, "record.json"), "utf8")) as { round: number; attempt: number; outcome: string };
    const analysisPath = join(stationsDir, name, "analysis.json");

    return { round: record.round, attempt: record.attempt, outcome: record.outcome, analysis: existsSync(analysisPath) ? (JSON.parse(readFileSync(analysisPath, "utf8")) as VisitAnalysis) : null };
  });
}

/**
 * Each loop's branch diff and each ticket's merged pull request diff, raw and with formatting noise removed, fetched by the diffs page only when someone opens a comparison.
 * A patch already written is kept: a loop's branch and a merged commit never change.
 */
async function writeSiteDiffs(config: ExperimentConfig, loops: readonly LoopRecord[], diffsDir: string): Promise<Map<string, string>> {
  const ownWork = new Map<string, string>();

  mkdirSync(diffsDir, { recursive: true });
  for (const ticket of config.tickets) {
    const ticketOwnWork = await writeTicketDiffs(config, ticket, loops.filter((loop) => loop.ticket === ticket.number), diffsDir);

    ticketOwnWork.forEach((patch, loopId) => ownWork.set(loopId, patch));
  }

  return ownWork;
}

async function writeTicketDiffs(config: ExperimentConfig, ticket: ExperimentConfig["tickets"][number], ticketLoops: readonly LoopRecord[], diffsDir: string): Promise<Map<string, string>> {
  const ownWork = new Map<string, string>();
  const prettierBin = prettierBinIn(cachedNodeModulesDir(join(paths.cacheDir, config.id), ticket.base_sha));
  const scratch = mkdtempSync(join(tmpdir(), "loop-bench-site-"));

  try {
    await git(["clone", "--bare", "--quiet", config.subject.mirror_dir, scratch], paths.root);
    const startHeads = await fetchStartHeads(config, ticket, scratch);
    const sources = [
      { id: `pr-${ticket.number}`, headSha: ticket.merge_sha, rawPatch: null, startSha: null },
      ...(await Promise.all(ticketLoops.map(async (loop) => {
        const bundle = join(paths.resultsDir, loop.cell_path, "branch.bundle");

        await git(["-c", "gc.auto=0", "-c", "maintenance.auto=false", "fetch", "--quiet", bundle, `refs/heads/loop-bench/${ticket.number}:refs/loops/${loop.loop_id}`], scratch);

        return { id: loop.loop_id, headSha: await git(["rev-parse", `refs/loops/${loop.loop_id}`], scratch), rawPatch: join(paths.resultsDir, loop.cell_path, "diff.patch"), startSha: startHeads.get(loop.varied_station ?? "") ?? null };
      }))),
    ];

    for (const source of sources.filter((candidate) => candidate.startSha)) {
      ownWork.set(source.id, await diffOf(scratch, source.startSha!, source.headSha));
    }

    for (const source of sources) {
      const raw = join(diffsDir, `${source.id}.patch`);
      const normalized = join(diffsDir, `${source.id}.normalized.patch`);

      if (!existsSync(raw)) {
        writeFileSync(raw, source.rawPatch ? readFileSync(source.rawPatch) : `${await diffOf(scratch, ticket.base_sha, source.headSha)}\n`);
      }
      if (prettierBin && !existsSync(normalized)) {
        writeFileSync(normalized, `${await normalizedDiff({ gitDir: scratch, baseSha: ticket.base_sha, headSha: source.headSha, prettierBin, formatPattern: config.subject.format_pattern })}\n`);
      }
    }
  } finally {
    // A fetch may leave git's own background housekeeping writing into the scratch repo for a moment.
    rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  }

  return ownWork;
}

/** The commit a coding or build-fix run was handed, per station: the head of the reference branch it started from. */
async function fetchStartHeads(config: ExperimentConfig, ticket: ExperimentConfig["tickets"][number], scratch: string): Promise<Map<string, string>> {
  const heads = new Map<string, string>();

  for (const [station, kind] of [["tdd-round", "dod"], ["repair-build", "red"]] as const) {
    const bundle = join(paths.artifactsDir, config.id, String(ticket.number), kind, "branch.bundle");

    if (existsSync(bundle)) {
      await git(["-c", "gc.auto=0", "-c", "maintenance.auto=false", "fetch", "--quiet", bundle, `refs/heads/loop-bench/${ticket.number}:refs/starts/${station}`], scratch);
      heads.set(station, await git(["rev-parse", `refs/starts/${station}`], scratch));
    }
  }

  return heads;
}

/** Market prices are applied when the report is written, so a corrected price table reaches every run already recorded. */
function repriced(records: readonly BenchRecord[]): BenchRecord[] {
  const visits = latestStationRuns(records).map((visit) =>
    ({ ...visit, cost_usd: costOf(visit.harness, visit.model, visit.usage).usd, cost_basis: costOf(visit.harness, visit.model, visit.usage).basis }),
  );
  const costByLoop = new Map<string, number>();

  for (const visit of visits) {
    costByLoop.set(visit.loop_id, (costByLoop.get(visit.loop_id) ?? 0) + visit.cost_usd);
  }

  return [
    ...visits,
    ...latestLoops(records).map((loop) => ({ ...loop, total_cost_usd: costByLoop.get(loop.loop_id) ?? loop.total_cost_usd })),
  ];
}

/** Every planned cell of a ticket, station and context that has at least one finished loop, which has none itself. */
function pendingCells(config: ExperimentConfig, loops: readonly LoopRecord[]): PendingCell[] {
  const keyOf = (ticket: number, station: string, context: string): string => `${ticket}|${station}|${context}`;
  const started = new Set(loops.map((loop) => keyOf(loop.ticket, loop.varied_station ?? loop.mode, loop.context_mode)));
  const finished = new Set(loops.map((loop) => loop.cell_path.replace(/\/rep-\d+$/, "")));
  const seen = new Set<string>();

  return plannedLoops(config).flatMap((loop) => {
    const station = loop.varied_station ?? loop.mode;
    const cell = cellPath(loop).replace(/\/rep-\d+$/, "");

    if (!started.has(keyOf(loop.ticket.number, station, loop.context_mode)) || finished.has(cell) || seen.has(cell)) {
      return [];
    }
    seen.add(cell);
    const choice = loop.varied_station ? loop.assignments[loop.varied_station] : loop.assignments.dod;
    const running = existsSync(join(paths.resultsDir, cell, `rep-1`, "stations"));

    return [{
      ticket: loop.ticket.number,
      station,
      agent: `${choice.harness}/${choice.model}`,
      effort: effortLabel(choice.harness, choice.model, choice.effort),
      context: loop.context_mode,
      prompt: loop.prompt_variant,
      status: running ? "running" : "not run yet",
    }];
  });
}

process.stdout.on("error", () => process.exit(0));
await main(process.argv.slice(2));
