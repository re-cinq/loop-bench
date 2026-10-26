import { describe, expect, it } from "vitest";
import type { Station } from "./harness-names.js";
import type { Outcome } from "./result-line.js";
import { keptThroughVariedStation, planCut, type ReplayedVisit } from "./truncate.js";

const visit = (station: Station, outcome: Outcome, ci: ReplayedVisit["ci"] = null): ReplayedVisit => ({ station, outcome, ci });
const red = (headSha: string): ReplayedVisit["ci"] => ({ green: false, head_sha: headSha });
const green = (headSha: string): ReplayedVisit["ci"] => ({ green: true, head_sha: headSha });

describe("keptThroughVariedStation", () => {
  it("keeps only the dod visit of a dod-varied loop and ends it as station_done", () => {
    const visits = [visit("dod", "success"), visit("tdd-round", "success", red("a")), visit("tdd-round", "success", green("b"))];

    expect(keptThroughVariedStation(visits, "dod")).toMatchObject({ kept: 1, reason: "station_done", state: { rounds: 0, repairs: 0 } });
  });

  it("keeps every tdd-round visit of a tdd-round-varied loop that went green and keeps the green reason", () => {
    const visits = [visit("tdd-round", "success", red("a")), visit("tdd-round", "success", green("b"))];

    expect(keptThroughVariedStation(visits, "tdd-round")).toMatchObject({ kept: 2, reason: "green", state: { rounds: 1 } });
  });

  it("drops the repair-build that follows a repeated red CI in a tdd-round-varied loop", () => {
    const visits = [visit("tdd-round", "success", red("a")), visit("tdd-round", "success", red("a")), visit("repair-build", "success", green("b"))];

    expect(keptThroughVariedStation(visits, "tdd-round")).toMatchObject({ kept: 2, reason: "station_done" });
  });

  it("drops the tdd-round that follows a red CI in a repair-build-varied loop", () => {
    const visits = [visit("repair-build", "success", red("a")), visit("tdd-round", "success", green("b"))];

    expect(keptThroughVariedStation(visits, "repair-build")).toMatchObject({ kept: 1, reason: "station_done" });
  });

  it("keeps a failed dod visit and its retry, and ends on retry_budget", () => {
    const visits = [visit("dod", "failed"), visit("dod", "failed")];

    expect(keptThroughVariedStation(visits, "dod")).toMatchObject({ kept: 2, reason: "retry_budget" });
  });

  it("returns a null reason when the visits end before the routing decides", () => {
    expect(keptThroughVariedStation([visit("tdd-round", "success", red("a"))], "tdd-round")).toMatchObject({ kept: 1, reason: null });
  });
});

describe("planCut", () => {
  const dodVaried = { mode: "ofat", varied_station: "dod", end_reason: "green" } as const;

  it("plans to keep one of three visits and end as station_done for a dod-varied loop that ran on to green", () => {
    const visits = [visit("dod", "success"), visit("tdd-round", "success", red("a")), visit("tdd-round", "success", green("b"))];

    expect(planCut(dodVaried, visits)).toMatchObject({ kept: 1, reason: "station_done" });
  });

  it("returns null for a loop already cut at the varied station", () => {
    expect(planCut({ ...dodVaried, end_reason: "station_done" }, [visit("dod", "success")])).toBeNull();
  });

  it("returns null for a baseline loop", () => {
    expect(planCut({ mode: "baseline", varied_station: null, end_reason: "green" }, [visit("dod", "success")])).toBeNull();
  });

  it("keeps the loop's own end reason when the visits stop before the routing decides", () => {
    const loop = { mode: "ofat", varied_station: "tdd-round", end_reason: "excluded_harness" } as const;

    expect(planCut(loop, [visit("tdd-round", "success", red("a")), visit("tdd-round", "success", red("b")), visit("tdd-round", "success", red("c"))])).toBeNull();
  });
});
