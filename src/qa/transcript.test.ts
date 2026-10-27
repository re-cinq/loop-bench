import { describe, expect, it } from "vitest";
import { parseAnswer, readTranscript } from "./transcript.js";

const line = (value: unknown): string => JSON.stringify(value);
const stream = [
  line({ type: "system", subtype: "init", tools: ["mcp__lore__lore_assemble_context"], mcp_servers: [{ name: "lore", status: "connected" }] }),
  line({ type: "assistant", message: { content: [{ type: "tool_use", id: "t1", name: "mcp__lore__lore_assemble_context", input: {} }] } }),
  line({ type: "user", message: { content: [{ type: "tool_result", tool_use_id: "t1", content: [{ type: "text", text: "x".repeat(400) }] }] } }),
  line({ type: "assistant", message: { content: [{ type: "tool_use", id: "t2", name: "mcp__lore__lore_search_memory", input: {} }] } }),
  line({ type: "user", message: { content: [{ type: "tool_result", tool_use_id: "t2", is_error: true, content: "timeout" }] } }),
  line({
    type: "result",
    is_error: false,
    result: '```json\n{"answer": "#3705", "sources": ["#3705"]}\n```',
    duration_ms: 9000,
    duration_api_ms: 6000,
    num_turns: 3,
    total_cost_usd: 0.04,
    usage: { input_tokens: 1200, output_tokens: 80, cache_read_input_tokens: 5000, cache_creation_input_tokens: 300 },
  }),
].join("\n");

describe("readTranscript", () => {
  it("reads the answer, 2 MCP calls of which 1 failed, 102 result tokens and 3000 ms outside the model", () => {
    expect(readTranscript(stream)).toMatchObject({
      answer: "#3705",
      answered_as_json: true,
      sources: ["#3705"],
      duration_ms: 9000,
      duration_api_ms: 6000,
      non_model_ms: 3000,
      num_turns: 3,
      mcp_calls: 2,
      mcp_tools: ["mcp__lore__lore_assemble_context", "mcp__lore__lore_search_memory"],
      mcp_errors: 1,
      mcp_result_tokens: 102,
      usage: { input_tokens: 1200, output_tokens: 80, cache_read_tokens: 5000, cache_write_tokens: 300, reported_cost_usd: 0.04 },
      init: { tools: ["mcp__lore__lore_assemble_context"], mcp_servers: [{ name: "lore", status: "connected" }] },
      is_error: false,
    });
  });

  it("reports an error and no answer for a run that never reached its result line", () => {
    expect(readTranscript(line({ type: "system", subtype: "init", tools: [], mcp_servers: [] }))).toMatchObject({ answer: null, is_error: true, mcp_calls: 0 });
  });
});

describe("readTranscript of a prose reply", () => {
  it("keeps the reply I do not know. as the answer and marks it as not JSON", () => {
    expect(readTranscript(line({ type: "result", is_error: false, result: " I do not know. ", usage: { input_tokens: 1, output_tokens: 1 } }))).toMatchObject({ answer: "I do not know.", answered_as_json: false });
  });
});

describe("parseAnswer", () => {
  it("returns null for prose with no JSON object", () => {
    expect(parseAnswer("I do not know.")).toBeNull();
  });
});
