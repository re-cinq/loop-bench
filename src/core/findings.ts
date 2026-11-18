import type { KnowledgeBase, RunRow } from "./model-stats.js";
import { groupBy } from "./model-stats.js";
import { WORKS_AS_OFTEN_SHARE, summarizeModels } from "./ranking.js";

export const KNOWLEDGE_BASES: readonly KnowledgeBase[] = ["none", "lore-mcp", "lore-utopia"];
export const TASK_KEYS = ["dod", "tdd-round", "repair-build"] as const;
export const SIZE_KEYS = ["small", "medium", "large"] as const;
const ABOUT_THE_SAME_POINTS = 5;

export interface KnowledgeMeasures {
  runs: number;
  successRate: number;
}

export interface KnowledgeComparison {
  task: string;
  setups: number;
  loreSetupsWithOneRun: number;
  byKnowledgeBase: Record<KnowledgeBase, KnowledgeMeasures>;
}

export type KnowledgeEffect = "helps" | "hurts" | "makes little difference" | "has mixed effects";

export interface ShakySize {
  task: string;
  size: string;
  successRate: number;
}

export interface MoneySpent {
  total: number;
  wasted: number;
  runsWithoutCost: number;
}

/** The runs of setups (model and ticket) that were run with no knowledge base, with Lore and with Utopia. */
function threeWaySetups(runs: readonly RunRow[]): RunRow[][] {
  return groupBy(runs, (run) => [run.task, run.harness, run.model, run.ticket]).filter((group) => KNOWLEDGE_BASES.every((kb) => group.some((run) => run.knowledgeBase === kb)));
}

function measuresOf(runs: readonly RunRow[]): KnowledgeMeasures {
  return { runs: runs.length, successRate: runs.filter((run) => run.success).length / runs.length };
}

/** Per knowledge base, the runs of one task on the setups that ran with all three, and how many Lore setups had one run only. */
export function compareKnowledgeBases(runs: readonly RunRow[], task: string): KnowledgeComparison {
  const groups = threeWaySetups(runs.filter((run) => run.task === task));
  const flat = groups.flat();
  const measuresPerKnowledgeBase = KNOWLEDGE_BASES.map((kb) => [kb, measuresOf(flat.filter((run) => run.knowledgeBase === kb))] as const);

  return {
    task,
    setups: groups.length,
    loreSetupsWithOneRun: groups.filter((group) => group.filter((run) => run.knowledgeBase === "lore-mcp").length === 1).length,
    byKnowledgeBase: Object.fromEntries(measuresPerKnowledgeBase) as Record<KnowledgeBase, KnowledgeMeasures>,
  };
}

const pointsOf = (comparison: KnowledgeComparison, kb: KnowledgeBase): number => Math.round((comparison.byKnowledgeBase[kb].successRate - comparison.byKnowledgeBase.none.successRate) * 100);

export function knowledgeEffectOf(comparison: KnowledgeComparison): KnowledgeEffect {
  const deltas = [pointsOf(comparison, "lore-mcp"), pointsOf(comparison, "lore-utopia")];

  if (deltas.every((delta) => delta >= ABOUT_THE_SAME_POINTS)) {
    return "helps";
  }
  if (deltas.every((delta) => delta <= -ABOUT_THE_SAME_POINTS)) {
    return "hurts";
  }

  return deltas.every((delta) => Math.abs(delta) < ABOUT_THE_SAME_POINTS) ? "makes little difference" : "has mixed effects";
}

/** Setups run two or more times, and how many of them both worked and failed on different repeats. */
export function repeatDisagreement(runs: readonly RunRow[]): { repeated: number; flipped: number } {
  const repeated = groupBy(runs, (run) => [run.setup]).filter((setup) => setup.length >= 2);

  return { repeated: repeated.length, flipped: repeated.filter((setup) => new Set(setup.map((run) => run.success)).size > 1).length };
}

/** The sizes of a task where the best model with five or more runs works in fewer than three quarters of runs, worst first. */
export function shakySizesOf(runs: readonly RunRow[]): ShakySize[] {
  const bestPerSize = TASK_KEYS.flatMap((task) =>
    SIZE_KEYS.flatMap((size) => {
      const rows = summarizeModels(runs.filter((run) => run.task === task && run.size === size), { reviewed: false }).filter((row) => row.strength === "measured");
      const best = Math.max(...rows.map((row) => row.successRate));

      return rows.length === 0 ? [] : [{ task, size, successRate: best }];
    }),
  );

  return bestPerSize.filter((item) => item.successRate < WORKS_AS_OFTEN_SHARE).sort((a, b) => a.successRate - b.successRate);
}

export function moneySpentOf(runs: readonly RunRow[]): MoneySpent {
  const priced = runs.filter((run) => run.costUsd !== null);
  const costOf = (group: readonly RunRow[]): number => group.reduce((sum, run) => sum + run.costUsd!, 0);

  return { total: costOf(priced), wasted: costOf(priced.filter((run) => !run.success)), runsWithoutCost: runs.length - priced.length };
}
