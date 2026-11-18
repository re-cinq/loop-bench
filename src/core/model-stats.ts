// Per task, model, knowledge base and ticket: how often a run worked, what it cost and how long it took, so a page can rank models without reading loop records.
import type { LoopRecord, StationRunRecord } from "./records.js";
import type { Station } from "./harness-names.js";
import { percentile } from "./stats.js";

export type TicketSize = "small" | "medium" | "large";
export type DataStrength = "measured" | "few" | "none";
export type KnowledgeBase = "none" | "lore-mcp" | "lore-utopia";

export interface Quartiles {
  median: number;
  p25: number;
  p75: number;
}

export interface ModelStatsInput {
  loops: readonly LoopRecord[];
  stationRuns: readonly StationRunRecord[];
  tiers: Readonly<Record<number, TicketSize>>;
}

/** One loop that fed the numbers: one run of one task by one model. */
export interface RunRow {
  loopId: string;
  task: Station;
  harness: string;
  model: string;
  knowledgeBase: KnowledgeBase;
  ticket: number;
  size: TicketSize | null;
  /** `task|harness|model|knowledgeBase|ticket`, the key of a setup row. */
  setup: string;
  replicate: number;
  success: boolean;
  /** Null when the run recorded no usage: it was stopped before the CLI reported any, so its cost is unknown, not zero. */
  costUsd: number | null;
  /** The models' working time: what each visit's CLI reports it took, added up, without the wait for the project's checks. */
  minutes: number;
  rounds: number;
  correctness: number | null;
  completeness: number | null;
  closeness: number | null;
  endReason: string;
}

/** The same numbers at three levels: `ticket` is set on setups, `size` on size roll-ups, `knowledgeBase` is null on model roll-ups. */
export interface StatsRow {
  task: Station;
  harness: string;
  model: string;
  knowledgeBase: KnowledgeBase | null;
  ticket: number | null;
  size: TicketSize | null;
  runs: number;
  successes: number;
  successRate: number;
  costUsd: Quartiles | null;
  /** Runs left out of the cost figures because their cost is unknown. */
  costUnknownRuns: number;
  minutes: Quartiles | null;
  /** Mean of the 1 to 5 reviewer scores over the runs that were reviewed. */
  correctness: number | null;
  completeness: number | null;
  closeness: number | null;
  roundsMedian: number | null;
  endReasons: Record<string, number>;
  /** Total spend over the successes, which is the mean cost divided by the success rate; null with no success. */
  costPerSuccessUsd: number | null;
  strength: DataStrength;
}

export interface Pair {
  without: number | null;
  withKb: number | null;
  delta: number | null;
}

/** One knowledge base against none for one task and model, over the tickets both were run on. */
export interface KnowledgeDifference {
  task: Station;
  harness: string;
  model: string;
  knowledgeBase: "lore-mcp" | "lore-utopia";
  tickets: number[];
  runsWithout: number;
  runsWithKb: number;
  successRate: Pair;
  medianCostUsd: Pair;
  medianMinutes: Pair;
}

export interface ModelStats {
  setups: StatsRow[];
  sizes: StatsRow[];
  models: StatsRow[];
  knowledgeDifferences: KnowledgeDifference[];
  runs: RunRow[];
  /** Loops that left the numbers out: `prompt_variant` other than baseline, or a repair-build loop whose repair agent never ran. */
  leftOut: { otherPromptVariant: number; repairNeverRan: number };
}

const MEASURED_RUNS = 5;

export function strengthOf(runs: number): DataStrength {
  if (runs === 0) {
    return "none";
  }

  return runs >= MEASURED_RUNS ? "measured" : "few";
}

const DECIMALS = 10_000;
const round = (value: number): number => Math.round(value * DECIMALS) / DECIMALS;
const minutesOf = (ms: number): number => round(ms / 60_000);

function mean(values: readonly number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function quartilesOf(values: readonly number[]): Quartiles | null {
  const median = percentile(values, 50);

  return median === null ? null : { median: round(median), p25: round(percentile(values, 25)!), p75: round(percentile(values, 75)!) };
}

/** Whether the run worked: the tests fail on the old code and pass with the real fix; the project's checks pass; the checks pass after the last repair visit that got a result. */
function succeededAt(loop: LoopRecord, task: Station, repairVisits: readonly StationRunRecord[]): boolean {
  if (task === "dod") {
    return loop.dod_check?.red_on_base === true && loop.dod_check.green_with_reference === true;
  }
  if (task === "tdd-round") {
    return loop.reached_green;
  }
  const lastResult = [...repairVisits].reverse().find((visit) => visit.ci !== null);

  return lastResult?.ci?.green === true;
}

function runRowOf(loop: LoopRecord, task: Station, success: boolean, workMs: number, tiers: ModelStatsInput["tiers"]): RunRow {
  const { harness, model } = loop.assignments[task];

  return {
    loopId: loop.loop_id,
    task,
    harness,
    model,
    knowledgeBase: loop.context_mode,
    ticket: loop.ticket,
    size: tiers[loop.ticket] ?? null,
    setup: [task, harness, model, loop.context_mode, loop.ticket].join("|"),
    replicate: loop.replicate,
    success,
    costUsd: loop.total_cost_usd > 0 ? round(loop.total_cost_usd) : null,
    minutes: minutesOf(workMs),
    rounds: loop.rounds,
    correctness: loop.judge?.correctness ?? null,
    completeness: loop.judge?.completeness_vs_ticket ?? null,
    closeness: loop.judge?.closeness_to_reference ?? null,
    endReason: loop.end_reason,
  };
}

function repairVisitsByLoop(stationRuns: readonly StationRunRecord[]): Map<string, StationRunRecord[]> {
  const byLoop = new Map<string, StationRunRecord[]>();

  for (const visit of stationRuns.filter((candidate) => candidate.station === "repair-build")) {
    byLoop.set(visit.loop_id, [...(byLoop.get(visit.loop_id) ?? []), visit]);
  }

  return byLoop;
}

// Neither clock on the record is the model's time. The loop's wall time includes waiting for the project's checks (20 seconds to 12 minutes for the same check, by how busy the machine was), and a visit's includes a CLI that stays alive after its last line (one sat 11 minutes after a 68-second session). So a visit counts for the duration its CLI reports, and for its wall time only where the CLI reports none (codex).
const workMsOf = (visit: StationRunRecord): number => visit.usage.reported_duration_ms ?? visit.wall_ms;

function workMsByLoop(stationRuns: readonly StationRunRecord[]): Map<string, number> {
  const byLoop = new Map<string, number>();

  for (const visit of stationRuns) {
    byLoop.set(visit.loop_id, (byLoop.get(visit.loop_id) ?? 0) + workMsOf(visit));
  }

  return byLoop;
}

export function modelStatsOf(input: ModelStatsInput): ModelStats {
  const repairVisits = repairVisitsByLoop(input.stationRuns);
  const workMs = workMsByLoop(input.stationRuns);
  const variedLoops = input.loops.filter((loop) => loop.varied_station !== null);
  const baselineLoops = variedLoops.filter((loop) => loop.prompt_variant === "baseline");
  const scorable = baselineLoops.filter((loop) => loop.varied_station !== "repair-build" || repairVisits.has(loop.loop_id));
  const runs = scorable.map((loop) => {
    const task = loop.varied_station!;

    return runRowOf(loop, task, succeededAt(loop, task, repairVisits.get(loop.loop_id) ?? []), workMs.get(loop.loop_id) ?? loop.total_wall_ms, input.tiers);
  });

  return {
    setups: statsRowsOf(runs, (run) => [run.task, run.harness, run.model, run.knowledgeBase, run.ticket], (run) => ({ knowledgeBase: run.knowledgeBase, ticket: run.ticket, size: null })),
    sizes: statsRowsOf(runs.filter((run) => run.size !== null), (run) => [run.task, run.harness, run.model, run.knowledgeBase, run.size], (run) => ({ knowledgeBase: run.knowledgeBase, ticket: null, size: run.size })),
    models: statsRowsOf(runs, (run) => [run.task, run.harness, run.model], () => ({ knowledgeBase: null, ticket: null, size: null })),
    knowledgeDifferences: knowledgeDifferencesOf(runs),
    runs,
    leftOut: { otherPromptVariant: variedLoops.length - baselineLoops.length, repairNeverRan: baselineLoops.length - scorable.length },
  };
}

type Where = Pick<StatsRow, "knowledgeBase" | "ticket" | "size">;

export function groupBy<T>(items: readonly T[], keyOf: (item: T) => readonly unknown[]): T[][] {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = keyOf(item).join("|");
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return [...groups.values()];
}

function statsRowsOf(runs: readonly RunRow[], keyOf: (run: RunRow) => readonly unknown[], whereOf: (run: RunRow) => Where): StatsRow[] {
  return groupBy(runs, keyOf).map((group) => statsRowOf(group, whereOf(group[0]!)));
}

function statsRowOf(group: readonly RunRow[], where: Where): StatsRow {
  const first = group[0]!;
  const successes = group.filter((run) => run.success).length;
  const meanOf = (pick: (run: RunRow) => number | null): number | null => mean(group.flatMap((run) => pick(run) ?? []));
  const knownCosts = group.flatMap((run) => run.costUsd ?? []);
  const meanKnownCost = mean(knownCosts);
  const endReasons: Record<string, number> = {};

  for (const run of group) {
    endReasons[run.endReason] = (endReasons[run.endReason] ?? 0) + 1;
  }

  return {
    task: first.task,
    harness: first.harness,
    model: first.model,
    ...where,
    runs: group.length,
    successes,
    successRate: round(successes / group.length),
    costUsd: quartilesOf(knownCosts),
    costUnknownRuns: group.length - knownCosts.length,
    minutes: quartilesOf(group.map((run) => run.minutes)),
    correctness: meanOf((run) => run.correctness),
    completeness: meanOf((run) => run.completeness),
    closeness: meanOf((run) => run.closeness),
    roundsMedian: round(percentile(group.map((run) => run.rounds), 50)!),
    endReasons,
    costPerSuccessUsd: successes === 0 || meanKnownCost === null ? null : round((meanKnownCost * group.length) / successes),
    strength: strengthOf(group.length),
  };
}

function pairOf(without: number | null, withKb: number | null): Pair {
  const rounded = (value: number | null): number | null => (value === null ? null : round(value));

  return { without: rounded(without), withKb: rounded(withKb), delta: without === null || withKb === null ? null : round(withKb - without) };
}

function knowledgeDifferencesOf(runs: readonly RunRow[]): KnowledgeDifference[] {
  return groupBy(runs, (run) => [run.task, run.harness, run.model]).flatMap((group) =>
    (["lore-mcp", "lore-utopia"] as const).flatMap((knowledgeBase) => differenceOf(group, knowledgeBase) ?? []),
  );
}

function differenceOf(group: readonly RunRow[], knowledgeBase: "lore-mcp" | "lore-utopia"): KnowledgeDifference | null {
  const ticketsOf = (context: KnowledgeBase): Set<number> => new Set(group.filter((run) => run.knowledgeBase === context).map((run) => run.ticket));
  const withKbTickets = ticketsOf(knowledgeBase);
  const tickets = [...ticketsOf("none")].filter((ticket) => withKbTickets.has(ticket)).sort((a, b) => a - b);

  if (tickets.length === 0) {
    return null;
  }
  const armOf = (context: KnowledgeBase): RunRow[] => group.filter((run) => run.knowledgeBase === context && tickets.includes(run.ticket));
  const [without, withKb] = [armOf("none"), armOf(knowledgeBase)];
  const rate = (arm: readonly RunRow[]): number => arm.filter((run) => run.success).length / arm.length;
  const first = group[0]!;

  return {
    task: first.task,
    harness: first.harness,
    model: first.model,
    knowledgeBase,
    tickets,
    runsWithout: without.length,
    runsWithKb: withKb.length,
    successRate: pairOf(rate(without), rate(withKb)),
    medianCostUsd: pairOf(percentile(without.flatMap((run) => run.costUsd ?? []), 50), percentile(withKb.flatMap((run) => run.costUsd ?? []), 50)),
    medianMinutes: pairOf(percentile(without.map((run) => run.minutes), 50), percentile(withKb.map((run) => run.minutes), 50)),
  };
}
