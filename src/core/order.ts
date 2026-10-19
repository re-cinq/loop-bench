import type { PlannedLoop } from "./matrix.js";

/** Every cell's first run before any cell's second, without Lore before with, and the harnesses taking turns within that, so parallel loops keep every CLI busy: each pass over the matrix is a complete table. */
export function breadthFirst(loops: readonly PlannedLoop[]): PlannedLoop[] {
  const contextOrder = (loop: PlannedLoop): number => (loop.context_mode === "none" ? 0 : 1);
  const harnessOf = (loop: PlannedLoop): string => (loop.varied_station ? loop.assignments[loop.varied_station] : loop.assignments.dod).harness;
  const turnOf = new Map<PlannedLoop, number>();
  const seen = new Map<string, number>();

  for (const loop of loops) {
    const key = `${loop.replicate}|${contextOrder(loop)}|${harnessOf(loop)}`;
    const turn = seen.get(key) ?? 0;

    turnOf.set(loop, turn);
    seen.set(key, turn + 1);
  }

  return [...loops].sort((a, b) => a.replicate - b.replicate || contextOrder(a) - contextOrder(b) || (turnOf.get(a) ?? 0) - (turnOf.get(b) ?? 0));
}
