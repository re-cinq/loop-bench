import { describe, expect, it } from "vitest";
import { ExperimentConfigSchema } from "../config/experiment.js";
import { plannedLoops } from "./matrix.js";

import { breadthFirst } from "./order.js";

const config = ExperimentConfigSchema.parse({
  id: "e",
  subject: { repo: "o/r", mirror_dir: "/m", ci_checks: [{ name: "t", command: "true" }] },
  tickets: [{ number: 1, title: "t", ticket_file: "1.md", reference_pr: 2, merge_sha: "aaaaaaaaaaaa", base_sha: "bbbbbbbbbbbb" }],
  baseline: { dod: { harness: "gemini", model: "g" }, "tdd-round": { harness: "claude", model: "s" }, "repair-build": { harness: "gemini", model: "g" } },
  variants: { dod: [{ harness: "claude", model: "c1" }, { harness: "claude", model: "c2" }, { harness: "codex", model: "x1" }, { harness: "gemini", model: "g2" }] },
  replicates: 2,
  judge: { harness: "gemini", model: "g" },
});

describe("breadthFirst", () => {
  it("puts every cell's first replicate first and alternates harnesses: gemini, claude, codex before the second claude", () => {
    const order = breadthFirst(plannedLoops(config).filter((loop) => loop.mode === "ofat" || loop.mode === "baseline"));
    const firstPass = order.filter((loop) => loop.replicate === 1).map((loop) => (loop.varied_station ? loop.assignments.dod.model : "baseline"));

    expect(order.slice(0, 5).every((loop) => loop.replicate === 1)).toBe(true);
    expect(firstPass.slice(0, 3).sort()).toEqual(["baseline", "c1", "x1"]);
    expect(firstPass.indexOf("c2")).toBeGreaterThan(firstPass.indexOf("x1"));
  });
});
