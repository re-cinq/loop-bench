import { describe, expect, it } from "vitest";
import { diffFacts, dodFacts, isTestFile, orderOfWork, runFactsOf, type Visit } from "./test-facts.js";

const REAL_DOD = `# Definition of Done

> \`afterModelResponse\` ... is handed the \`lastUsage\` local: \`chatOrchestrator.ts\` assigns \`lastUsage = outcome.usage ?? lastUsage\` on each round.

**Strategy: \`direct\`** — \`createChatOrchestrator\` with a scripted provider and an \`afterModelResponse\` hook is a real seam today. The tests assume the first shape the ticket weighs: one \`usage\` argument, summed across rounds.

## Done when these pass

- [ ] **reports the sum of every provider call in a two-tool-round turn** — rounds of 100/200/300 input tokens report 600 in total.
      \`src/orchestration/afterModelResponseUsage.acceptance.test.ts\`
- [ ] **still counts the rounds that reported when others did not** — a silent round neither zeroes nor NaNs the total.
      \`src/orchestration/afterModelResponseUsage.acceptance.test.ts\`

## Facets

- [ ] Accumulate usage per round in chatOrchestrator.ts and pass the sum (undefined when nothing reported)

## Out of scope

- The audit/billing record, non-provider token accounting, the \`stop\` chunk's usage shape.
- Per-round breakdown (the rejected shape; record why in the issue).`;

const ACCEPTANCE = "src/a.acceptance.test.ts";

const newTestFile = `diff --git a/src/a.test.ts b/src/a.test.ts
new file mode 100644
--- /dev/null
+++ b/src/a.test.ts
@@ -0,0 +1,9 @@
+describe("sum", () => {
+  it("adds 1 and 2", () => {
+    expect(add(1, 2)).toBe(3);
+  });
+  it("adds nothing", () => {
+    expect(add()).toBe(0);
+  });
+});
diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@ -1,1 +1,3 @@
 export const x = 1;
+export const add = (...n: number[]) => n.reduce((a, b) => a + b, 0);
+export const y = 2;
`;

describe("dodFacts", () => {
  it("reads the approach, 2 tests with file and 2 out-of-scope lines from a real dod.md", () => {
    expect(dodFacts(REAL_DOD)).toEqual({
      approach: "Strategy: direct — createChatOrchestrator with a scripted provider and an afterModelResponse hook is a real seam today. The tests assume the first shape the ticket weighs: one usage argument, summed across rounds.",
      tests: [
        { name: "reports the sum of every provider call in a two-tool-round turn", proves: "rounds of 100/200/300 input tokens report 600 in total.", file: "src/orchestration/afterModelResponseUsage.acceptance.test.ts" },
        { name: "still counts the rounds that reported when others did not", proves: "a silent round neither zeroes nor NaNs the total.", file: "src/orchestration/afterModelResponseUsage.acceptance.test.ts" },
      ],
      outOfScope: ["The audit/billing record, non-provider token accounting, the `stop` chunk's usage shape.", "Per-round breakdown (the rejected shape; record why in the issue)."],
    });
  });

  it("returns empty facts for text without any dod headings", () => {
    expect(dodFacts("just some words")).toEqual({ approach: null, tests: [], outOfScope: [] });
  });

  it("reads a test without bold name or file as name and proves split on the dash", () => {
    expect(dodFacts("## Done when\n\n- adds numbers - sums two ints\n").tests).toEqual([{ name: "adds numbers", proves: "sums two ints", file: null }]);
  });
});

describe("isTestFile", () => {
  it("accepts 4 test path shapes and rejects a product path", () => {
    expect(["a.test.ts", "a.spec.js", "src/__tests__/a.ts", "a.acceptance.ts", "src/a.ts"].map(isTestFile)).toEqual([true, true, true, true, false]);
  });
});

describe("diffFacts", () => {
  it("counts 2 tests with code, 8 test lines against 2 product lines and no tampering when a diff only adds tests", () => {
    const facts = diffFacts(newTestFile, [ACCEPTANCE]);

    expect(facts).toEqual({
      testFilesTouched: ["src/a.test.ts"],
      testsAdded: [
        { name: "sum", file: "src/a.test.ts", kind: "describe", code: 'describe("sum", () => {' },
        { name: "adds 1 and 2", file: "src/a.test.ts", kind: "test", code: '  it("adds 1 and 2", () => {\n    expect(add(1, 2)).toBe(3);\n  });' },
        { name: "adds nothing", file: "src/a.test.ts", kind: "test", code: '  it("adds nothing", () => {\n    expect(add()).toBe(0);\n  });' },
      ],
      testsAddedCount: 2,
      addedTestLines: 8,
      addedProductLines: 2,
      tampering: { editedExistingTests: [], changedGivenTests: [], disabledTests: [], deletedTestFiles: [], changedCount: 0, weakenedCount: 0, flagged: false },
    });
  });

  const patchOf = (file: string, removed: string[], added: string[], context = ""): string =>
    `diff --git a/${file} b/${file}\n--- a/${file}\n+++ b/${file}\n@@ -1,1 +1,1 @@\n${context}${removed.map((line) => `-${line}\n`).join("")}${added.map((line) => `+${line}\n`).join("")}`;
  const tamperingOf = (removed: string[], added: string[], given: string[] = [ACCEPTANCE]) => diffFacts(patchOf(ACCEPTANCE, removed, added), given).tampering;

  it("reports nothing for a prettier-style reflow of an assertion across lines with other quotes", () => {
    const tampering = tamperingOf(['  expect(add("a", 2)).toBe(3);'], ["  expect(", "    add('a', 2),", "  ).toBe(3);"]);

    expect(tampering).toEqual({ editedExistingTests: [], changedGivenTests: [], disabledTests: [], deletedTestFiles: [], changedCount: 0, weakenedCount: 0, flagged: false });
  });

  it("reports a renamed-but-kept assertion in a given file as changed and not flagged", () => {
    const tampering = tamperingOf(["  expect(add(1, 2)).toBe(3);"], ["  expect(sum(1, 2)).toBe(3);"]);

    expect(tampering).toEqual({
      editedExistingTests: [],
      changedGivenTests: [{ file: ACCEPTANCE, level: "changed", reasons: [], removedTitles: [], expectsRemoved: 1, expectsAdded: 1, addedCount: 1, removedCount: 1, removedSample: ["  expect(add(1, 2)).toBe(3);"] }],
      disabledTests: [],
      deletedTestFiles: [],
      changedCount: 1,
      weakenedCount: 0,
      flagged: false,
    });
  });

  it("reports 3 expects folded into 1 toEqual in a given file as changed, with the counts, and not flagged", () => {
    const tampering = tamperingOf(["  expect(a).toBe(1);", "  expect(b).toBe(2);", "  expect(c).toBe(3);"], ["  expect({a, b, c}).toEqual({a: 1, b: 2, c: 3});"]);

    expect(tampering.changedGivenTests).toMatchObject([{ file: ACCEPTANCE, level: "changed", reasons: [], expectsRemoved: 3, expectsAdded: 1 }]);
    expect(tampering.flagged).toBe(false);
  });

  it("reports a retitled test as changed, because the file still has 1 test", () => {
    const tampering = tamperingOf(['  it("adds 1 and 2", () => {'], ['  it("adds one and two", () => {']);

    expect(tampering.changedGivenTests).toMatchObject([{ level: "changed", reasons: [], removedTitles: ["adds 1 and 2"] }]);
  });

  it("flags a removed test title in an existing, not given, test file as weakened", () => {
    const tampering = tamperingOf(['  it("adds 1 and 2", () => {', "  });"], ["  // gone"], []);

    expect(tampering.editedExistingTests).toMatchObject([{ file: ACCEPTANCE, level: "weakened", reasons: ["fewer-tests"], removedTitles: ["adds 1 and 2"] }]);
  });

  it("keeps a test whose title was only moved out of the weakened reasons", () => {
    const tampering = tamperingOf(['  it("adds 1 and 2", () => {', "  expect(1).toBe(1);"], ['  it("adds 1 and 2", () => {', "  expect(1).toBe(1);", "  expect(2).toBe(2);"]);

    expect(tampering.weakenedCount).toBe(0);
  });

  it("flags an added it.skip in an existing file and a deleted test file as weakened", () => {
    const patch = `diff --git a/src/b.test.ts b/src/b.test.ts
--- a/src/b.test.ts
+++ b/src/b.test.ts
@@ -1,1 +1,2 @@
 import x from "x";
+it.skip("later", () => {});
diff --git a/src/c.test.ts b/src/c.test.ts
deleted file mode 100644
--- a/src/c.test.ts
+++ /dev/null
@@ -1,1 +0,0 @@
-it("gone", () => {});
`;
    const tampering = diffFacts(patch, []).tampering;

    expect({ files: [...tampering.editedExistingTests.map((change) => [change.file, change.reasons]), ...tampering.deletedTestFiles.map((file) => [file])], flagged: tampering.flagged }).toEqual({
      files: [["src/b.test.ts", ["disabled-test"]], ["src/c.test.ts", ["fewer-tests", "deleted-file"]], ["src/c.test.ts"]],
      flagged: true,
    });
  });

  it("returns zero counts for an empty patch", () => {
    expect(diffFacts("", []).testsAddedCount).toBe(0);
  });
});

const visit = (round: number, commands: string[], testRuns: number, outcome = "success", attempt = 0): Visit => ({ round, attempt, outcome, analysis: { shell_commands: commands, test_runs: testRuns } });

describe("orderOfWork", () => {
  it("reads a round that writes a test, runs it, then edits product as test first", () => {
    const rounds = orderOfWork([visit(0, ["cd t; cat > src/a.test.ts <<'EOF'\nimport './a.ts'\nEOF", "npx vitest run src/a.test.ts", "sed -i 's/1/2/' src/a.ts"], 1)]);

    expect(rounds).toEqual([{ round: 0, visits: 1, outcome: "success", testRuns: 1, heuristicTestWrittenBeforeProductWrite: true, heuristicTestRunBeforeProductWrite: true }]);
  });

  it("reads a round that edits product before any test run as not test first", () => {
    const rounds = orderOfWork([visit(0, ["sed -i 's/1/2/' src/a.ts", "npx vitest run"], 1, "changes_requested")]);

    expect(rounds).toEqual([{ round: 0, visits: 1, outcome: "changes_requested", testRuns: 1, heuristicTestWrittenBeforeProductWrite: false, heuristicTestRunBeforeProductWrite: false }]);
  });

  it("gives null flags when the log shows no write and no test run", () => {
    expect(orderOfWork([visit(1, ["ls"], 0)])).toEqual([{ round: 1, visits: 1, outcome: "success", testRuns: 0, heuristicTestWrittenBeforeProductWrite: null, heuristicTestRunBeforeProductWrite: null }]);
  });

  it("merges 2 attempts of one round into 1 entry with 3 test runs", () => {
    expect(orderOfWork([visit(2, ["npm test"], 1, "failed", 0), visit(2, ["npm test", "npm test"], 2, "success", 1)])).toMatchObject([{ round: 2, visits: 2, outcome: "success", testRuns: 3 }]);
  });

  it("returns null when one visit has no analysis", () => {
    expect(orderOfWork([visit(0, [], 0), { round: 1, attempt: 0, outcome: "success", analysis: null }])).toBeNull();
  });
});

describe("runFactsOf", () => {
  const dodMarkdown = `## Done when these pass\n\n- [ ] **adds** — sums\n      \`${ACCEPTANCE}\`\n`;
  const editGivenPatch = `diff --git a/${ACCEPTANCE} b/${ACCEPTANCE}\n--- a/${ACCEPTANCE}\n+++ b/${ACCEPTANCE}\n@@ -1,1 +1,1 @@\n-old\n+new\n`;

  it("flags a change to the given test in a coding run and not in the test-writing run that made it", () => {
    const flagged = (task: "dod" | "tdd-round") => runFactsOf({ loopId: "l", task, dodMarkdown, patch: editGivenPatch, visits: [] }).diff?.tampering.changedGivenTests.length;

    expect([flagged("tdd-round"), flagged("dod")]).toEqual([1, 0]);
  });

  it("gives null facts and no order of work for a run without dod.md, diff or visits", () => {
    expect(runFactsOf({ loopId: "l", task: "tdd-round", dodMarkdown: null, patch: null, visits: [] })).toEqual({ loopId: "l", task: "tdd-round", dod: null, diff: null, orderOfWork: null });
  });
});
