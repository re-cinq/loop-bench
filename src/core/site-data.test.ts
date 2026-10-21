import { describe, expect, it } from "vitest";
import type { LoopRecord, StationRunRecord } from "./records.js";
import { siteDataOf, type SiteInput } from "./site-data.js";
import { EMPTY_USAGE } from "./usage.js";

const loop = (overrides: Partial<LoopRecord>): LoopRecord => ({
  kind: "loop",
  experiment_id: "e",
  loop_id: "x",
  cell_path: "p",
  ticket: 93,
  mode: "ofat",
  varied_station: "dod",
  assignments: { dod: { harness: "claude", model: "opus" }, "tdd-round": { harness: "claude", model: "sonnet" }, "repair-build": { harness: "gemini", model: "pro" } },
  prompt_variant: "baseline",
  context_mode: "none",
  replicate: 1,
  end_reason: "green",
  rounds: 2,
  repairs: 0,
  reached_green: true,
  total_cost_usd: 4,
  total_wall_ms: 600_000,
  total_usage: EMPTY_USAGE,
  structural: null,
  dod_check: null,
  judge: { correctness: 4, completeness_vs_ticket: 4, closeness_to_reference: 4, rationale: "", model: "j" },
  final_head_sha: null,
  started_at: "",
  finished_at: "",
  ...overrides,
});

const stationRun = (overrides: Partial<StationRunRecord>): StationRunRecord => ({
  kind: "station_run",
  experiment_id: "e",
  loop_id: "x",
  run_id: "r",
  ticket: 93,
  station: "dod",
  round: 0,
  attempt: 0,
  harness: "codex",
  model: "luna",
  prompt_variant: "baseline",
  context_mode: "none",
  outcome: "success",
  extras: {},
  failure_class: "none",
  exit_code: 0,
  usage: { ...EMPTY_USAGE, output_tokens: 1000, tool_calls: 10 },
  cost_usd: 1,
  cost_basis: "list",
  wall_ms: 120_000,
  head_sha_before: "",
  head_sha_after: "",
  pushed: true,
  ci: null,
  prompt_sha256_verbatim: "",
  prompt_sha256_sent: "",
  prompts_lore_sha: "",
  cli_version: "",
  started_at: "",
  ...overrides,
});

const input = (overrides: Partial<SiteInput>): SiteInput => ({
  experimentId: "e",
  subjectRepo: "o/r",
  promptsLoreSha: "abc",
  generatedAt: "now",
  conclusions: "",
  loops: [],
  pending: [],
  stationRuns: [],
  ...overrides,
});

describe("siteDataOf", () => {
  it("returns two runs of one cell as cost 3–5 with 1/2 reached green and loop ids a, b in replicate order", () => {
    const data = siteDataOf(input({ loops: [loop({ loop_id: "b", replicate: 2, total_cost_usd: 3 }), loop({ loop_id: "a", total_cost_usd: 5, reached_green: false, end_reason: "round_budget" })] }));

    expect(data.cells).toMatchObject([{ harness: "claude", model: "opus", context: "none", loopIds: ["a", "b"], runs: 2, reachedGreen: 1, costUsd: { mean: 4, min: 3, max: 5 }, minutes: { mean: 10 }, judgeMean: 4, endReasons: { green: 1, round_budget: 1 } }]);
  });

  it("leaves a model with only a Utopia cell paired against no KB, Lore empty", () => {
    const data = siteDataOf(input({ loops: [loop({}), loop({ context_mode: "lore-utopia" })] }));

    expect(data.lorePairs).toMatchObject([{ lore: null, utopia: data.cells.find((cell) => cell.context === "lore-utopia")?.id }]);
  });

  it("marks a cell dominated when a rival is cheaper, as fast and as well judged", () => {
    const cheap = loop({ assignments: { ...loop({}).assignments, dod: { harness: "codex", model: "luna" } }, total_cost_usd: 1 });
    const data = siteDataOf(input({ loops: [loop({}), cheap] }));

    expect(data.cells.map((cell) => [cell.model, cell.dominated])).toEqual([["opus", true], ["luna", false]]);
  });

  it("pairs a model's no-KB cell with its Lore cell and its Lore-on-Utopia cell", () => {
    const data = siteDataOf(input({ loops: [loop({}), loop({ context_mode: "lore-mcp" }), loop({ context_mode: "lore-utopia" })] }));
    const idOf = (context: string): string | undefined => data.cells.find((cell) => cell.context === context)?.id;

    expect(data.lorePairs).toEqual([{ ticket: 93, station: "dod", harness: "claude", model: "opus", prompt: "baseline", without: idOf("none"), lore: idOf("lore-mcp"), utopia: idOf("lore-utopia") }]);
  });

  it("lists a pending cell as not run yet with no numbers", () => {
    const data = siteDataOf(input({ pending: [{ ticket: 93, station: "dod", agent: "codex/luna", effort: "medium", context: "lore-mcp", prompt: "baseline", status: "not run yet" }] }));

    expect(data.cells).toMatchObject([{ model: "luna", context: "lore-mcp", status: "not run yet", loopIds: [], runs: 0, costUsd: null, dominated: false }]);
  });

  it("returns station spend of two visits as cost 1–3 with one timeout", () => {
    const data = siteDataOf(input({ stationRuns: [stationRun({}), stationRun({ cost_usd: 3, failure_class: "timeout" })] }));

    expect(data.stations).toEqual([{ station: "dod", harness: "codex", model: "luna", context: "none", visits: 2, costUsd: { n: 2, mean: 2, min: 1, max: 3, sd: 1 }, minutes: { n: 2, mean: 2, min: 2, max: 2, sd: 0 }, outputTokens: { n: 2, mean: 1000, min: 1000, max: 1000, sd: 0 }, toolCalls: { n: 2, mean: 10, min: 10, max: 10, sd: 0 }, failures: { timeout: 1 } }]);
  });
});
