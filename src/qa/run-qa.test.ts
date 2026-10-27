import { describe, expect, it } from "vitest";
import type { Bank } from "./bank.js";
import { askPath, plannedAsks, qaLoreServer, utopiaServer } from "./run-qa.js";

const bank: Bank = {
  repo: "re-cinq/Otto",
  checked_at: "2026-10-27",
  utopia_kb_id: "00000000-0000-4000-8000-000000000001",
  questions: [
    { id: "otto-trk-01", kind: "tracker", question: "Q1", gold_answer: "A1", evidence: [], must_abstain: false },
    { id: "otto-trk-02", kind: "tracker", question: "Q2", gold_answer: "A2", evidence: [], must_abstain: false },
  ],
};

describe("plannedAsks", () => {
  it("asks every question of every arm once per replicate, replicate 1 first", () => {
    expect(plannedAsks([bank], ["none", "lore"], 2).map(askPath)).toEqual([
      "re-cinq__Otto/otto-trk-01/none/rep-1",
      "re-cinq__Otto/otto-trk-01/lore/rep-1",
      "re-cinq__Otto/otto-trk-02/none/rep-1",
      "re-cinq__Otto/otto-trk-02/lore/rep-1",
      "re-cinq__Otto/otto-trk-01/none/rep-2",
      "re-cinq__Otto/otto-trk-01/lore/rep-2",
      "re-cinq__Otto/otto-trk-02/none/rep-2",
      "re-cinq__Otto/otto-trk-02/lore/rep-2",
    ]);
  });
});

describe("qaLoreServer", () => {
  it("points CONTEXT_PATH at the empty run dir instead of the lore checkout", () => {
    expect(qaLoreServer({ dir: "/lore", apiUrl: "https://api", token: "tok" }, "/runs/x/run").env).toMatchObject({ CONTEXT_PATH: "/runs/x/run", LORE_AGENT_ID: "context-qa-bench" });
  });
});

describe("utopiaServer", () => {
  it("mounts the base's MCP route with the PAT as a bearer", () => {
    expect(utopiaServer("http://127.0.0.1:18080", "utp_pat_x", "kb-1")).toEqual({
      name: "utopia",
      url: "http://127.0.0.1:18080/api/v1/kbs/kb-1/mcp",
      headers: { Authorization: "Bearer utp_pat_x" },
      blockedTools: ["remember"],
    });
  });
});
