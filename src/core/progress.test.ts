import { describe, expect, it } from "vitest";
import type { Station } from "./harness-names.js";
import { progressOf, type PlannedCell } from "./progress.js";

const agent = (harness: "codex" | "claude" | "gemini", model: string) => ({ harness, model });
const assignments = {
  dod: agent("gemini", "pro"),
  "tdd-round": agent("claude", "sonnet"),
  "repair-build": agent("gemini", "pro"),
};

const planned = (loopId: string, station: Station | null, choice: ReturnType<typeof agent>, overrides: Partial<PlannedCell> = {}): PlannedCell => ({
  loop_id: loopId,
  mode: station === null ? "baseline" : "ofat",
  varied_station: station,
  assignments: station === null ? assignments : { ...assignments, [station]: choice },
  prompt_variant: "baseline",
  context_mode: "none",
  ...overrides,
});

describe("progressOf", () => {
  it("counts 1 of 2 planned cells done for a model, with the split by context", () => {
    const cells = [planned("a", "dod", agent("codex", "luna")), planned("b", "dod", agent("codex", "luna"), { context_mode: "lore-mcp" })];

    expect(progressOf(cells, new Set(["a"]))).toEqual([
      {
        harness: "codex",
        model: "luna",
        done: 1,
        planned: 2,
        byContext: { none: { done: 1, planned: 1 }, "lore-mcp": { done: 0, planned: 1 }, "lore-utopia": { done: 0, planned: 0 } },
      },
    ]);
  });

  it("lists models in the order their first cell is planned and shows 0 of N before anything has run", () => {
    const cells = [planned("a", "dod", agent("codex", "luna")), planned("b", "tdd-round", agent("claude", "opus")), planned("c", "dod", agent("codex", "luna"))];

    expect(progressOf(cells, new Set()).map(({ model, done, planned: total }) => [model, done, total])).toEqual([["luna", 0, 2], ["opus", 0, 1]]);
  });

  it("counts a baseline loop for the model at its dod station", () => {
    expect(progressOf([planned("a", null, agent("gemini", "pro"))], new Set(["a"]))).toMatchObject([{ model: "pro", done: 1, planned: 1 }]);
  });

  it("leaves prompt-variant cells out, since they test the prompt and not the model", () => {
    const cells = [planned("a", "dod", agent("gemini", "pro")), planned("b", "dod", agent("gemini", "pro"), { prompt_variant: "short" })];

    expect(progressOf(cells, new Set(["a", "b"]))).toMatchObject([{ model: "pro", done: 1, planned: 1 }]);
  });

  it("ignores finished loops that are not in the plan", () => {
    expect(progressOf([planned("a", "dod", agent("codex", "luna"))], new Set(["old-config-loop"]))).toMatchObject([{ done: 0, planned: 1 }]);
  });
});
