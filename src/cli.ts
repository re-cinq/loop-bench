// loop-bench: replay the implementation loop's agent stations across harnesses, models, contexts and prompts.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { parseArgs } from "node:util";
import { loadExperiment, type ExperimentConfig } from "./config/experiment.js";
import { analyzeTranscript, type TranscriptAnalysis } from "./core/analyze.js";
import type { VisitRow } from "./core/station-report.js";
import type { BenchRecord } from "./core/records.js";
import { enforce } from "./core/enforce.js";
import { HarnessSchema, StationSchema, type Station } from "./core/harness-names.js";
import { cellPath, plannedLoops, type PlannedLoop } from "./core/matrix.js";
import { breadthFirst } from "./core/order.js";
import { costOf } from "./core/pricing.js";
import { renderReport } from "./core/report.js";
import { finalText, parseNodeResult } from "./core/result-line.js";
import { usageFromStream } from "./core/usage.js";
import { ADAPTERS } from "./harness/adapters.js";
import { buildScratchHome } from "./harness/scratch-home.js";
import { runProcess } from "./io/spawn.js";
import { InfraError, runLoop } from "./run/loop.js";
import { HarnessLanes } from "./run/harness-lanes.js";
import { loreServer } from "./run/station.js";
import { benchPaths } from "./run/paths.js";
import { propose, type ProposalEvidence } from "./run/propose.js";
import { appendRecord, latestLoops, latestStationRuns, readLoopJson, readRecords, writeLoopJson } from "./run/results.js";
import { scoreDod, scoreJudge, withScores } from "./run/score.js";
import { ensureDepsCache } from "./workspace/deps-cache.js";

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
  run ... --parallel <n>                      run n loops at a time (default 1)
  run ... --per-harness <n>                   at most n agent runs per CLI at a time, across all loops

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
      return smoke(config(), values.harness, values.model, values.context === "lore-mcp");
    case "run":
      return runSelected(config(), breadthFirst(selected()), values.force, values["keep-run"], Number(values.parallel), values["per-harness"] === undefined ? undefined : new HarnessLanes(Number(values["per-harness"])));
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
      (filters.station === undefined || station === filters.station) &&
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

async function smoke(config: ExperimentConfig, harness: string | undefined, model: string | undefined, withLore: boolean): Promise<void> {
  const parsedHarness = HarnessSchema.parse(harness);

  enforce(model !== undefined, "smoke needs --model");
  const dir = join(paths.runsDir, `smoke-${parsedHarness}-${Date.now()}`);
  const workspaceDir = join(dir, "workspace");

  mkdirSync(workspaceDir, { recursive: true });
  const spec = {
    model,
    prompt: withLore
      ? "Call the Lore MCP tool lore_list_repos. Then reply with one line naming how many repositories it returned, and end with the line: LORE_NODE_RESULT: success"
      : "Run the shell command `npm test` in this directory, then reply with exactly one line: LORE_NODE_RESULT: success",
    workspaceDir,
    homeDir: join(dir, "home"),
    mcp: withLore ? loreServer(config) : null,
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

async function runSelected(config: ExperimentConfig, loops: readonly PlannedLoop[], force: boolean, keepRun: boolean, parallel: number, lanes?: HarnessLanes): Promise<void> {
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
        await runLoop(loop, { config, paths, log, keepRun, ...(lanes ? { lanes } : {}) });
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

async function makeArtifact(config: ExperimentConfig, ticket: string | undefined, kind: string | undefined, fromCell: string | undefined): Promise<void> {
  enforce(ticket !== undefined && (kind === "dod" || kind === "red") && fromCell !== undefined, "make-artifact needs --ticket, --kind dod|red and --from-cell");
  const bundle = join(fromCell, "branch.bundle");

  enforce(existsSync(bundle), `${bundle} does not exist: the cell's loop pushed nothing`);
  const dir = join(paths.artifactsDir, config.id, ticket, kind);

  mkdirSync(dir, { recursive: true });
  cpSync(bundle, join(dir, "branch.bundle"));
  if (kind === "red") {
    const brief = latestRoundBrief(fromCell);

    enforce(brief !== null, `no red CI verdict in ${fromCell}: pick a cell whose loop went red at least once`);
    writeFileSync(join(dir, "round-brief.md"), brief);
  }
  writeFileSync(join(dir, "SOURCE"), `${relative(ROOT, fromCell)}\n`);
  log(`[loop-bench] ${kind} artifact for #${ticket} from ${fromCell}`);
}

function latestRoundBrief(cellDir: string): string | null {
  const stationsDir = join(cellDir, "stations");
  const verdicts = readdirSync(stationsDir)
    .sort()
    .map((visit) => join(stationsDir, visit, "ci-verdict.json"))
    .filter(existsSync)
    .map((path) => JSON.parse(readFileSync(path, "utf8")) as { green: boolean; headSha: string; checks: Array<{ name: string; passed: boolean; tail: string }> })
    .filter((verdict) => !verdict.green);
  const last = verdicts.at(-1);

  if (!last) {
    return null;
  }
  const { ciFeedbackOf, roundBriefOf } = awaitedRoundBrief;
  const feedback = ciFeedbackOf(last.headSha, last.checks);

  return feedback ? roundBriefOf({ feedback, handoff: null }) : null;
}

const awaitedRoundBrief = await import("./core/round-brief.js");

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

/** The one markdown file holding everything: tables from results.jsonl, every visit with its analysis, and the conclusions written beside it. */
function writeReport(config: ExperimentConfig): string {
  const records = repriced(readRecords(paths.resultsDir, config.id));
  const experimentDir = join(paths.resultsDir, config.id);
  const visits: VisitRow[] = latestStationRuns(records).map((record) => {
    const loop = latestLoops(records).find((candidate) => candidate.loop_id === record.loop_id);
    const visitDir = visitDirs(config.id).find((dir) => readRecordId(dir) === record.run_id);
    const analysisPath = visitDir ? join(visitDir, "analysis.json") : null;

    return {
      record,
      analysis: analysisPath && existsSync(analysisPath) ? (JSON.parse(readFileSync(analysisPath, "utf8")) as TranscriptAnalysis) : null,
      cellPath: loop?.cell_path ?? (visitDir ? relative(paths.resultsDir, join(visitDir, "..", "..")) : record.loop_id),
    };
  });
  const conclusionsPath = join(experimentDir, "conclusions.md");
  const markdown = renderReport({
    experimentId: config.id,
    loops: latestLoops(records),
    visits,
    promptsLoreSha: readFileSync(join(paths.promptsDir, "LORE_SHA"), "utf8").trim(),
    subjectRepo: config.subject.repo,
    generatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
    conclusions: existsSync(conclusionsPath) ? readFileSync(conclusionsPath, "utf8").trim() : "_No conclusions yet: too few loops have finished._",
  });

  mkdirSync(experimentDir, { recursive: true });
  writeFileSync(join(experimentDir, "REPORT.md"), markdown);

  return markdown;
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

function readRecordId(dir: string): string | null {
  try {
    return (JSON.parse(readFileSync(join(dir, "record.json"), "utf8")) as { run_id?: string }).run_id ?? null;
  } catch {
    return null;
  }
}

process.stdout.on("error", () => process.exit(0));
await main(process.argv.slice(2));
