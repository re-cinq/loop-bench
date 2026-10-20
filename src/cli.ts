// loop-bench: replay the implementation loop's agent stations across harnesses, models, contexts and prompts.
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, resolve } from "node:path";
import { parseArgs } from "node:util";
import { loadExperiment, type ExperimentConfig } from "./config/experiment.js";
import { analyzeTranscript, type TranscriptAnalysis } from "./core/analyze.js";
import type { VisitRow } from "./core/station-report.js";
import type { BenchRecord, LoopRecord, StationRunRecord } from "./core/records.js";
import { ciFeedbackOf, handoffOf, roundBriefOf, type CheckResult } from "./core/round-brief.js";
import { diffOf, git } from "./workspace/git.js";
import { normalizedDiff, prettierBinIn } from "./run/normalize-diff.js";
import { enforce } from "./core/enforce.js";
import { ContextModeSchema, HarnessSchema, StationSchema, type ContextMode, type Harness, type Station } from "./core/harness-names.js";
import { cellPath, plannedLoops, type PlannedLoop } from "./core/matrix.js";
import { breadthFirst } from "./core/order.js";
import { costOf } from "./core/pricing.js";
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
import { cachedNodeModulesDir, ensureDepsCache } from "./workspace/deps-cache.js";

const ROOT = join(import.meta.dirname, "..");
const paths = benchPaths(ROOT);
const log = (line: string): void => void process.stderr.write(`${line}\n`);

const USAGE = `loop-bench <command> [options]

  plan        --experiment <file> [filters]   list the loops a run would start, with their cell folders
  prepare     --experiment <file>             install dependencies once per ticket base commit
  smoke       --harness <h> --model <m>        one tiny run under a scratch HOME: auth, stream parsing, cost
  run         --experiment <file> [filters]   run loops; skips cells whose loop.json exists (use --force)
  make-artifact --experiment <file> --ticket <n> --kind dod|red --from-cell <dir>
  score       --experiment <file> [filters]   dod red/green check + judge on finished loops
  analyze     --experiment <file>             transcript metrics per station visit -> analysis.json
  propose     --experiment <file> --station <s> [--worst 5]
  report      --experiment <file>             rewrite results/<experiment>/REPORT.md and print it
  site        --experiment <file>             write the results website's data to site/data/
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
      return scoreSelected(config(), selected());
    case "analyze":
      return void analyzeAll(config());
    case "propose":
      return proposeFor(config(), values.station, Number(values.worst));
    case "report":
      return void process.stdout.write(writeReport(config()));
    case "site":
      return writeSiteData(config());
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
    const dir = await ensureDepsCache({ cacheDir: join(paths.cacheDir, config.id), mirrorDir: config.subject.mirror_dir, baseSha: ticket.base_sha, installCommand: config.subject.install_command });

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
        await scoreSelected(config, [loop]);
        analyzeAll(config);
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

async function scoreSelected(config: ExperimentConfig, loops: readonly PlannedLoop[]): Promise<void> {
  for (const loop of loops) {
    const cellDir = join(paths.resultsDir, cellPath(loop));
    const record = readLoopJson(cellDir);

    if (!record) {
      continue;
    }
    const ranDod = record.mode !== "ofat" || record.varied_station === "dod";
    const dodCheck = ranDod
      ? await scoreDod({ config, paths, ticket: loop.ticket, cellDir, testCommand: (files) => `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath ${files.map((file) => `'${file}'`).join(" ")}` })
      : null;
    const judge = await scoreJudge({ config, paths, ticket: loop.ticket, cellDir });
    const scored = withScores(record, dodCheck, judge);

    writeLoopJson(cellDir, scored);
    appendRecord(paths.resultsDir, config.id, scored);
    log(`[loop-bench] scored ${cellPath(loop)}: dod ${dodCheck ? `red=${dodCheck.red_on_base} green=${dodCheck.green_with_reference}` : "—"}, judge ${judge ? `${judge.correctness}/${judge.completeness_vs_ticket}/${judge.closeness_to_reference}` : "—"}`);
  }
}

function visitDirs(experimentId: string): string[] {
  const root = join(paths.resultsDir, experimentId);

  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name === "record.json")
    .map((entry) => entry.parentPath);
}

function analyzeAll(config: ExperimentConfig): void {
  const dirs = visitDirs(config.id);

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

/** The one markdown file holding everything: tables from results.jsonl, every visit with its analysis, and the conclusions written beside it. */
function writeReport(config: ExperimentConfig): string {
  const { records, loops, experimentDir, promptsLoreSha, generatedAt, conclusions } = reportInputs(config);
  const visits: VisitRow[] = latestStationRuns(records).map((record) => {
    const loop = loops.find((candidate) => candidate.loop_id === record.loop_id);
    const visitDir = visitDirs(config.id).find((dir) => readRecordId(dir) === record.run_id);
    const analysisPath = visitDir ? join(visitDir, "analysis.json") : null;

    return {
      record,
      analysis: analysisPath && existsSync(analysisPath) ? (JSON.parse(readFileSync(analysisPath, "utf8")) as TranscriptAnalysis) : null,
      cellPath: loop?.cell_path ?? (visitDir ? relative(paths.resultsDir, join(visitDir, "..", "..")) : record.loop_id),
    };
  });
  const markdown = renderReport({
    experimentId: config.id,
    tiers: Object.fromEntries(config.tickets.flatMap((ticket) => (ticket.complexity ? [[ticket.number, ticket.complexity]] : []))),
    loops,
    pending: pendingCells(config, loops),
    visits,
    promptsLoreSha,
    subjectRepo: config.subject.repo,
    generatedAt,
    conclusions,
  });

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
  });

  mkdirSync(dataDir, { recursive: true });
  writeFileSync(join(dataDir, "bench.json"), JSON.stringify(data));
  if (existsSync(join(experimentDir, "results.jsonl"))) {
    copyFileSync(join(experimentDir, "results.jsonl"), join(dataDir, "results.jsonl"));
  }
  await writeSiteDiffs(config, loops, join(dataDir, "diffs"));
  log(`[loop-bench] site data written to ${relative(ROOT, dataDir)}: ${data.cells.length} cells, ${data.lorePairs.length} Lore pairs`);
}

/**
 * Each loop's branch diff and each ticket's merged pull request diff, raw and with formatting noise removed, fetched by the diffs page only when someone opens a comparison.
 * A patch already written is kept: a loop's branch and a merged commit never change.
 */
async function writeSiteDiffs(config: ExperimentConfig, loops: readonly LoopRecord[], diffsDir: string): Promise<void> {
  mkdirSync(diffsDir, { recursive: true });
  for (const ticket of config.tickets) {
    const prettierBin = prettierBinIn(cachedNodeModulesDir(join(paths.cacheDir, config.id), ticket.base_sha));
    const ticketLoops = loops.filter((loop) => loop.ticket === ticket.number);
    const scratch = mkdtempSync(join(tmpdir(), "loop-bench-site-"));

    try {
      await git(["clone", "--bare", "--quiet", config.subject.mirror_dir, scratch], paths.root);
      const sources = [
        { id: `pr-${ticket.number}`, headSha: ticket.merge_sha, rawPatch: null },
        ...(await Promise.all(ticketLoops.map(async (loop) => {
          const bundle = join(paths.resultsDir, loop.cell_path, "branch.bundle");

          await git(["fetch", "--quiet", bundle, `refs/heads/loop-bench/${ticket.number}:refs/loops/${loop.loop_id}`], scratch);

          return { id: loop.loop_id, headSha: await git(["rev-parse", `refs/loops/${loop.loop_id}`], scratch), rawPatch: join(paths.resultsDir, loop.cell_path, "diff.patch") };
        }))),
      ];

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
      rmSync(scratch, { recursive: true, force: true });
    }
  }
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

function readRecordId(dir: string): string | null {
  try {
    return (JSON.parse(readFileSync(join(dir, "record.json"), "utf8")) as { run_id?: string }).run_id ?? null;
  } catch {
    return null;
  }
}

process.stdout.on("error", () => process.exit(0));
await main(process.argv.slice(2));
