import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { finalText, parseNodeResult } from "./result-line.js";

const fixture = (name: string): string =>
  readFileSync(join(import.meta.dirname, "../../test/fixtures/streams", name), "utf8");

describe("parseNodeResult", () => {
  it("a bare `LORE_NODE_RESULT: success` parses to success with no extras", () => {
    expect(parseNodeResult("done\nLORE_NODE_RESULT: success")).toEqual({ outcome: "success", extras: {} });
  });

  it("keeps only string extras from the JSON payload", () => {
    const text = 'LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"no seam","n":3}}';

    expect(parseNodeResult(text)).toEqual({ outcome: "changes_requested", extras: { dod_blocked: "no seam" } });
  });

  it("the last line-start marker wins over one quoted mid-text", () => {
    const text = "I will print LORE_NODE_RESULT: failed later.\nLORE_NODE_RESULT: failed\nLORE_NODE_RESULT: success";

    expect(parseNodeResult(text)?.outcome).toBe("success");
  });

  it("returns null for a payload that is neither an outcome word nor valid JSON", () => {
    expect(parseNodeResult("LORE_NODE_RESULT: {outcome: success}")).toBeNull();
    expect(parseNodeResult("no marker here")).toBeNull();
  });
});

describe("finalText", () => {
  it("claude: the result line's text", () => {
    expect(finalText("claude", fixture("claude-cli.jsonl"))).toBe("ok");
  });

  it("gemini: the trailing assistant delta chunks concatenated with no separator", () => {
    const stream = [
      '{"type":"init","session_id":"s"}',
      '{"type":"message","role":"user","content":"go"}',
      '{"type":"message","role":"assistant","content":"LORE_NODE_RESULT: ","delta":true}',
      '{"type":"message","role":"assistant","content":"success","delta":true}',
      '{"type":"result","status":"success","stats":{}}',
    ].join("\n");

    expect(finalText("gemini", stream)).toBe("LORE_NODE_RESULT: success");
    expect(finalText("gemini", fixture("gemini-cli.jsonl"))).toBe("ok");
  });

  it("codex: the last completed agent_message", () => {
    expect(finalText("codex", fixture("codex-cli.jsonl"))).toBe("ok");
  });

  it("falls back to the raw output when the stream has no final text", () => {
    expect(finalText("claude", "plain text")).toBe("plain text");
    expect(finalText("codex", fixture("codex-cli-error.jsonl"))).toBe(fixture("codex-cli-error.jsonl"));
  });
});
