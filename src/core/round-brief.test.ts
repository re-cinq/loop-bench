import { describe, expect, it } from "vitest";
import { ciFeedbackOf, handoffOf, roundBriefOf } from "./round-brief.js";

const RED = { sha: "deadbeef", failedChecks: "lint, test", summary: "src/a.ts:7 no-unused-vars" };

describe("roundBriefOf", () => {
  it("names the sha deadbeef, the failed checks lint and test, and fences what they printed", () => {
    expect(roundBriefOf({ feedback: RED, handoff: null })).toBe(
      [
        "## CI reported failures on deadbeef",
        "",
        "The build for your last push is red. These checks failed: lint, test",
        "",
        "Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.",
        "",
        "```",
        "src/a.ts:7 no-unused-vars",
        "```",
        "",
      ].join("\n"),
    );
  });

  it("leaves the fence out when the jobs printed nothing", () => {
    expect(roundBriefOf({ feedback: { ...RED, summary: "" }, handoff: null })).not.toContain("```");
  });

  it("cuts what the jobs printed at 2500 characters and says so", () => {
    const brief = roundBriefOf({ feedback: { ...RED, summary: "x".repeat(3000) }, handoff: null });

    expect(brief).toContain(`${"x".repeat(2500)}\n...(truncated)`);
    expect(brief).not.toContain("x".repeat(2501));
  });

  it("adds what the previous round reported it did and what it left for next", () => {
    expect(roundBriefOf({ feedback: RED, handoff: { done: "parses the header", next: "reject an empty body" } })).toContain(
      "## The previous round reported\n\n- Done: parses the header\n- Next: reject an empty body\n",
    );
  });
});

describe("ciFeedbackOf", () => {
  it("is null when every check passed", () => {
    expect(ciFeedbackOf("abc", [{ name: "test", passed: true, tail: "" }])).toBeNull();
  });

  it("names the failed checks eslint and test and renders a block per failed check with its tail", () => {
    const checks = [
      { name: "typecheck", passed: true, tail: "ok" },
      { name: "eslint", passed: false, tail: "src/a.ts:1 error\n" },
      { name: "test", passed: false, tail: "" },
    ];

    expect(ciFeedbackOf("abc", checks)).toEqual({
      sha: "abc",
      failedChecks: "eslint, test",
      summary: "### eslint (failure)\n\nsrc/a.ts:1 error",
    });
  });
});

describe("handoffOf", () => {
  it("reads tdd_done and tdd_next, and is null without tdd_next", () => {
    expect(handoffOf({ tdd_done: "a", tdd_next: "b" })).toEqual({ done: "a", next: "b" });
    expect(handoffOf({ tdd_next: "b" })).toEqual({ done: null, next: "b" });
    expect(handoffOf({ tdd_done: "a" })).toBeNull();
  });
});
