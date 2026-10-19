import { describe, expect, it } from "vitest";
import { HarnessLanes } from "./harness-lanes.js";

describe("HarnessLanes", () => {
  it("with 1 per harness, two claude runs go one after the other while a gemini run overlaps them", async () => {
    const lanes = new HarnessLanes(1);
    const events: string[] = [];
    const job = (name: string) => async () => {
      events.push(`${name} start`);
      await new Promise((resolve) => setTimeout(resolve, 20));
      events.push(`${name} end`);
    };

    await Promise.all([lanes.run("claude", job("c1")), lanes.run("claude", job("c2")), lanes.run("gemini", job("g1"))]);

    expect(events.slice(0, 2)).toEqual(["c1 start", "g1 start"]);
    expect(events.indexOf("c2 start")).toBeGreaterThan(events.indexOf("c1 end"));
  });
});
