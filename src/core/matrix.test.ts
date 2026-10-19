import { describe, expect, it } from "vitest";
import { ExperimentConfigSchema } from "../config/experiment.js";
import { cellPath, plannedLoops } from "./matrix.js";

const config = ExperimentConfigSchema.parse({
  id: "exp",
  subject: { repo: "o/r", mirror_dir: "/m", ci_checks: [{ name: "test", command: "npm test" }] },
  tickets: [
    { number: 93, title: "t", ticket_file: "93.md", reference_pr: 96, merge_sha: "652b6dceb198", base_sha: "867ad52245c8" },
  ],
  baseline: {
    dod: { harness: "gemini", model: "g-pro" },
    "tdd-round": { harness: "claude", model: "sonnet" },
    "repair-build": { harness: "gemini", model: "g-pro" },
  },
  variants: { dod: [{ harness: "claude", model: "opus" }, { harness: "codex", model: "gpt" }] },
  prompt_variants: { dod: ["short"] },
  whole_loop: [{ harness: "codex", model: "gpt" }],
  context_modes: ["none", "lore-mcp"],
  replicates: 2,
  judge: { harness: "gemini", model: "argon" },
});

describe("plannedLoops", () => {
  it("counts 1 ticket × 2 contexts × (1 baseline + 2 model variants + 1 prompt variant + 1 whole loop) × 2 replicates = 20 loops", () => {
    expect(plannedLoops(config)).toHaveLength(20);
  });

  it("a dod variant keeps the baseline on the other stations and enters at dod", () => {
    const variant = plannedLoops(config).find((loop) => loop.mode === "ofat" && loop.assignments.dod.model === "opus");

    expect(variant).toMatchObject({
      varied_station: "dod",
      entry: "dod",
      assignments: { dod: { harness: "claude", model: "opus" }, "tdd-round": { harness: "claude", model: "sonnet" } },
    });
  });

  it("loop ids are stable across calls and unique", () => {
    const ids = plannedLoops(config).map((loop) => loop.loop_id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(plannedLoops(config).map((loop) => loop.loop_id)).toEqual(ids);
  });

  it("cell paths read exp/93/dod/claude-opus/none/rep-1 and exp/93/dod/prompt-short/none/rep-1", () => {
    const paths = plannedLoops(config).map(cellPath);

    expect(paths).toContain("exp/93/dod/claude-opus/none/rep-1");
    expect(paths).toContain("exp/93/dod/prompt-short/none/rep-1");
    expect(paths).toContain("exp/93/baseline/gemini-g-pro/lore-mcp/rep-2");
    expect(paths).toContain("exp/93/whole_loop/codex-gpt/none/rep-1");
  });
});
