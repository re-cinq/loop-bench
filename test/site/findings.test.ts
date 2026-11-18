import { describe, expect, it } from "vitest";
import { factsOf, findingsOf, moneyText, recommendations, type FindingRun } from "../../site/js/findings.js";

const TICKETS = [{ ticket: 1, size: "small" }, { ticket: 2, size: "large" }];
const KNOWLEDGE_BASES = ["none", "lore-mcp", "lore-utopia"];
const TASKS = ["dod", "tdd-round", "repair-build"];

const setupsOf = () => TASKS.flatMap((task) => KNOWLEDGE_BASES.flatMap((knowledgeBase) => TICKETS.map((ticket) => ({ task, knowledgeBase, ...ticket }))));

function runsOf(model: string, successEvery: number, costUsd: number | null): FindingRun[] {
  const attempt = (setup: ReturnType<typeof setupsOf>[number], replicate: number): FindingRun => ({
    ...setup, harness: "claude", model, replicate, setup: `${setup.task}|claude|${model}|${setup.knowledgeBase}|${setup.ticket}`,
    success: replicate % successEvery !== 0 || successEvery === 1, costUsd, minutes: 10, correctness: null, completeness: null, closeness: null, endReason: "green",
  });
  return setupsOf().flatMap((setup) => [0, 1, 2, 3, 4].map((replicate) => attempt(setup, replicate)));
}

const runs = [...runsOf("steady", 1, 2), ...runsOf("flaky", 2, 0.5)];

describe("recommendations", () => {
  it("names one model per task among models that ran every ticket", () => {
    expect(recommendations(runs).map((item) => [item.task, item.model, item.runs])).toEqual([["dod", "steady", 30], ["tdd-round", "steady", 30], ["repair-build", "steady", 30]]);
  });
});

describe("findingsOf", () => {
  const findings = findingsOf(runs);

  it("gives six findings each linking to a page", () => {
    expect(findings.map((finding) => finding.href.split("#")[0])).toEqual(["lore.html", "setup.html", "grid.html", "best.html", "best.html", "best.html"]);
  });

  it("counts flipping setups from the runs", () => {
    expect(findings.at(1)?.text).toBe("Of 36 setups run three or more times, 18 (50%) both worked and failed on different repeats, so one run is a weak guide.");
  });

  it("shares the money spent on runs that did not work", () => {
    expect(findings.at(4)?.text).toBe("$27.00 of the $225.00 with a recorded cost (12%) went to runs that did not work; 0 runs have no recorded cost and are left out.");
  });
});

describe("moneyText", () => {
  it.each([[null, "unknown"], [0.004, "under $0.01"], [0.4, "$0.40"], [3394.87, "$3,395"]])("formats $0 as $1", (value, text) => {
    expect(moneyText(value)).toBe(text);
  });
});

describe("factsOf", () => {
  it("counts runs, models and tickets", () => {
    expect(factsOf(runs, 5)).toEqual({ runs: 180, models: 2, tickets: 2, totalCostUsd: 5 });
  });
});
