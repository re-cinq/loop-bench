// The results website's one data file: every cell as numbers rather than markdown, the with/without-Lore pairs, and the per-station spend.
import type { LoopRecord, StationRunRecord } from "./records.js";
import { cellsOf, type CellSummary, type PendingCell } from "./report.js";
import { spreadOf, type Spread } from "./stats.js";

export interface SiteCell {
  id: string;
  ticket: number;
  station: string;
  harness: string;
  model: string;
  effort: string;
  lore: boolean;
  prompt: string;
  status: "done" | "running" | "not run yet";
  runs: number;
  reachedGreen: number;
  rounds: Spread | null;
  costUsd: Spread | null;
  minutes: Spread | null;
  correctness: Spread | null;
  completeness: Spread | null;
  closeness: Spread | null;
  judgeMean: number | null;
  redToGreen: { passed: number; of: number } | null;
  files: Spread | null;
  jaccard: Spread | null;
  additions: number | null;
  deletions: number | null;
  endReasons: Record<string, number>;
  /** Another finished cell of the same ticket and station is at least as cheap, fast and well judged, and better on one of them. */
  dominated: boolean;
}

export interface LorePair {
  ticket: number;
  station: string;
  harness: string;
  model: string;
  prompt: string;
  without: string;
  with: string;
}

export interface StationSpend {
  station: string;
  harness: string;
  model: string;
  lore: boolean;
  visits: number;
  costUsd: Spread | null;
  minutes: Spread | null;
  outputTokens: Spread | null;
  toolCalls: Spread | null;
  failures: Record<string, number>;
}

export interface SiteData {
  experimentId: string;
  subjectRepo: string;
  promptsLoreSha: string;
  generatedAt: string;
  conclusions: string;
  loops: number;
  totalCostUsd: number;
  cells: SiteCell[];
  lorePairs: LorePair[];
  stations: StationSpend[];
}

export interface SiteInput {
  experimentId: string;
  subjectRepo: string;
  promptsLoreSha: string;
  generatedAt: string;
  conclusions: string;
  loops: readonly LoopRecord[];
  pending: readonly PendingCell[];
  stationRuns: readonly StationRunRecord[];
}

export function siteDataOf(input: SiteInput): SiteData {
  const cells = withDominance([...cellsOf(input.loops).map(finishedCell), ...input.pending.map(pendingCell)]);

  return {
    experimentId: input.experimentId,
    subjectRepo: input.subjectRepo,
    promptsLoreSha: input.promptsLoreSha,
    generatedAt: input.generatedAt,
    conclusions: input.conclusions,
    loops: input.loops.length,
    totalCostUsd: input.loops.reduce((sum, loop) => sum + loop.total_cost_usd, 0),
    cells,
    lorePairs: lorePairsOf(cells),
    stations: stationSpendOf(input.stationRuns),
  };
}

const LORE_CONTEXT = "lore-mcp";
const minutesOf = (ms: number): number => ms / 60_000;
const meanOf = (spread: Spread | null): number | null => spread?.mean ?? null;

function splitAgent(agent: string): { harness: string; model: string } {
  const [harness = "", model = ""] = agent.split("/");

  return { harness, model };
}

function finishedCell(cell: CellSummary): SiteCell {
  const loops = cell.loops;
  const judged = loops.flatMap((loop) => (loop.judge ? [loop.judge] : []));
  const dodChecks = loops.flatMap((loop) => (loop.dod_check ? [loop.dod_check] : []));
  const structural = loops.flatMap((loop) => (loop.structural ? [loop.structural] : []));
  const correctness = spreadOf(judged.map((judge) => judge.correctness));
  const completeness = spreadOf(judged.map((judge) => judge.completeness_vs_ticket));
  const closeness = spreadOf(judged.map((judge) => judge.closeness_to_reference));
  const judgeMeans = [correctness, completeness, closeness].flatMap((spread) => (spread ? [spread.mean] : []));
  const endReasons: Record<string, number> = {};

  for (const loop of loops) {
    endReasons[loop.end_reason] = (endReasons[loop.end_reason] ?? 0) + 1;
  }

  return {
    id: cell.key,
    ticket: cell.ticket,
    station: cell.station,
    ...splitAgent(cell.agent),
    effort: cell.effort,
    lore: cell.context === LORE_CONTEXT,
    prompt: cell.prompt,
    status: "done",
    runs: loops.length,
    reachedGreen: loops.filter((loop) => loop.reached_green).length,
    rounds: spreadOf(loops.map((loop) => loop.rounds)),
    costUsd: spreadOf(loops.map((loop) => loop.total_cost_usd)),
    minutes: spreadOf(loops.map((loop) => minutesOf(loop.total_wall_ms))),
    correctness,
    completeness,
    closeness,
    judgeMean: judgeMeans.length === 3 ? judgeMeans.reduce((sum, value) => sum + value, 0) / 3 : null,
    redToGreen: dodChecks.length === 0 ? null : { passed: dodChecks.filter((check) => check.red_on_base && check.green_with_reference).length, of: dodChecks.length },
    files: spreadOf(structural.map((item) => item.files)),
    jaccard: spreadOf(structural.map((item) => item.jaccard_files)),
    additions: meanOf(spreadOf(structural.map((item) => item.additions))),
    deletions: meanOf(spreadOf(structural.map((item) => item.deletions))),
    endReasons,
    dominated: false,
  };
}

function pendingCell(cell: PendingCell): SiteCell {
  return {
    id: [cell.ticket, cell.station, cell.agent, cell.effort, cell.context, cell.prompt].join("|"),
    ticket: cell.ticket,
    station: cell.station,
    ...splitAgent(cell.agent),
    effort: cell.effort,
    lore: cell.context === LORE_CONTEXT,
    prompt: cell.prompt,
    status: cell.status,
    runs: 0,
    reachedGreen: 0,
    rounds: null,
    costUsd: null,
    minutes: null,
    correctness: null,
    completeness: null,
    closeness: null,
    judgeMean: null,
    redToGreen: null,
    files: null,
    jaccard: null,
    additions: null,
    deletions: null,
    endReasons: {},
    dominated: false,
  };
}

interface Tradeoff {
  cost: number;
  minutes: number;
  judge: number;
}

function tradeoffOf(cell: SiteCell): Tradeoff | null {
  const cost = meanOf(cell.costUsd);
  const minutes = meanOf(cell.minutes);

  return cost === null || minutes === null || cell.judgeMean === null ? null : { cost, minutes, judge: cell.judgeMean };
}

function beats(a: Tradeoff, b: Tradeoff): boolean {
  const noWorse = a.cost <= b.cost && a.minutes <= b.minutes && a.judge >= b.judge;
  const better = a.cost < b.cost || a.minutes < b.minutes || a.judge > b.judge;

  return noWorse && better;
}

function withDominance(cells: readonly SiteCell[]): SiteCell[] {
  return cells.map((cell) => {
    const own = tradeoffOf(cell);
    const rivals = cells.filter((other) => other.ticket === cell.ticket && other.station === cell.station).flatMap((other) => tradeoffOf(other) ?? []);

    return { ...cell, dominated: own !== null && rivals.some((rival) => beats(rival, own)) };
  });
}

function lorePairsOf(cells: readonly SiteCell[]): LorePair[] {
  const pairKey = (cell: SiteCell): string => [cell.ticket, cell.station, cell.harness, cell.model, cell.effort, cell.prompt].join("|");
  const finished = cells.filter((cell) => cell.status === "done");
  const withLore = new Map(finished.filter((cell) => cell.lore).map((cell) => [pairKey(cell), cell]));

  return finished
    .filter((cell) => !cell.lore && withLore.has(pairKey(cell)))
    .map((without) => ({ ticket: without.ticket, station: without.station, harness: without.harness, model: without.model, prompt: without.prompt, without: without.id, with: withLore.get(pairKey(without))?.id ?? "" }));
}

function stationSpendOf(runs: readonly StationRunRecord[]): StationSpend[] {
  const groups = new Map<string, StationRunRecord[]>();

  for (const run of runs) {
    const key = [run.station, run.harness, run.model, run.context_mode].join("|");
    groups.set(key, [...(groups.get(key) ?? []), run]);
  }

  return [...groups.values()].flatMap(([first, ...rest]) => {
    if (!first) {
      return [];
    }
    const group = [first, ...rest];
    const failures: Record<string, number> = {};

    for (const run of group.filter((candidate) => candidate.failure_class !== "none")) {
      failures[run.failure_class] = (failures[run.failure_class] ?? 0) + 1;
    }

    return [{
      station: first.station,
      harness: first.harness,
      model: first.model,
      lore: first.context_mode === LORE_CONTEXT,
      visits: group.length,
      costUsd: spreadOf(group.map((run) => run.cost_usd)),
      minutes: spreadOf(group.map((run) => minutesOf(run.wall_ms))),
      outputTokens: spreadOf(group.map((run) => run.usage.output_tokens)),
      toolCalls: spreadOf(group.flatMap((run) => (run.usage.tool_calls === null ? [] : [run.usage.tool_calls]))),
      failures,
    }];
  }).sort((a, b) => a.station.localeCompare(b.station) || a.model.localeCompare(b.model) || Number(a.lore) - Number(b.lore));
}
