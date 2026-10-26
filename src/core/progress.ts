// How much of each model's planned work has finished: the denominator is the experiment file's plan, so it follows the file when a ticket, repeat or context is added.
import type { PlannedLoop } from "./matrix.js";
import type { ContextMode, Harness } from "./harness-names.js";

export type PlannedCell = Pick<PlannedLoop, "loop_id" | "mode" | "varied_station" | "assignments" | "prompt_variant" | "context_mode">;

export interface Tally {
  done: number;
  planned: number;
}

export interface ModelProgress extends Tally {
  harness: Harness;
  model: string;
  byContext: Record<ContextMode, Tally>;
}

const emptyTally = (): Tally => ({ done: 0, planned: 0 });

export function progressOf(plannedCells: readonly PlannedCell[], finishedLoopIds: ReadonlySet<string>): ModelProgress[] {
  const byModel = new Map<string, ModelProgress>();

  for (const cell of plannedCells.filter((candidate) => candidate.prompt_variant === "baseline")) {
    const { harness, model } = cell.assignments[cell.varied_station ?? "dod"];
    const key = `${harness}/${model}`;
    const progress = byModel.get(key) ?? { harness, model, ...emptyTally(), byContext: { none: emptyTally(), "lore-mcp": emptyTally(), "lore-utopia": emptyTally() } };
    const isDone = finishedLoopIds.has(cell.loop_id) ? 1 : 0;
    const context = progress.byContext[cell.context_mode];

    progress.planned += 1;
    progress.done += isDone;
    context.planned += 1;
    context.done += isDone;
    byModel.set(key, progress);
  }

  return [...byModel.values()];
}
