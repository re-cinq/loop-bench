import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { EMPTY_USAGE, usageFromStream } from "./usage.js";

const fixture = (name: string): string =>
  readFileSync(join(import.meta.dirname, "../../test/fixtures/streams", name), "utf8");

describe("usageFromStream", () => {
  it("claude: 2 input, 16747 cache writes, 4 output, cost 0.002095575 reported", () => {
    expect(usageFromStream("claude", fixture("claude-cli.jsonl"))).toMatchObject({
      input_tokens: 2,
      cache_write_tokens: 16747,
      cache_read_tokens: 0,
      output_tokens: 4,
      reported_cost_usd: 0.002095575,
      tool_calls: 0,
    });
  });

  it("gemini: 10535 input, 1 output, 2039 ms, no cost", () => {
    expect(usageFromStream("gemini", fixture("gemini-cli.jsonl"))).toMatchObject({
      input_tokens: 10535,
      output_tokens: 1,
      reported_duration_ms: 2039,
      reported_cost_usd: null,
      tool_calls: 0,
    });
  });

  it("codex: sums 7742 + 100 input tokens over two turns and 6400 cached", () => {
    const stream = `${fixture("codex-cli.jsonl")}\n{"type":"turn.completed","usage":{"input_tokens":100,"cached_input_tokens":0,"output_tokens":10,"reasoning_output_tokens":7}}`;

    expect(usageFromStream("codex", stream)).toMatchObject({
      input_tokens: 7842,
      cache_read_tokens: 6400,
      output_tokens: 15,
      reasoning_tokens: 7,
      reported_cost_usd: null,
    });
  });

  it("a stream without a terminal line reports empty usage", () => {
    expect(usageFromStream("codex", fixture("codex-cli-error.jsonl"))).toEqual(EMPTY_USAGE);
  });
});
