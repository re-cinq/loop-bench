import { describe, expect, it } from "vitest";
import { analyzeTranscript } from "./analyze.js";

describe("analyzeTranscript", () => {
  it("claude: 3 tool calls (2 reads of the same file, 1 npm ci shell), one guard block, first edit none", () => {
    const stream = [
      JSON.stringify({ type: "assistant", message: { content: [{ type: "tool_use", name: "Read", input: { file_path: "a.ts" } }] } }),
      JSON.stringify({ type: "assistant", message: { content: [{ type: "tool_use", name: "Read", input: { file_path: "a.ts" } }] } }),
      JSON.stringify({ type: "assistant", message: { content: [{ type: "tool_use", name: "Bash", input: { command: "npm ci && npm test" } }] } }),
      JSON.stringify({ type: "user", message: { content: [{ type: "tool_result", content: "[lore] blocked: unscoped test runner", is_error: true }] } }),
    ].join("\n");

    expect(analyzeTranscript("claude", stream)).toMatchObject({
      turns: 3,
      tool_calls: 3,
      by_kind: { read: 2, shell: 1, edit: 0 },
      repeated_reads: 1,
      reinstalls_or_builds: 1,
      test_runs: 1,
      guard_blocked: 1,
      first_edit_index: null,
    });
  });

  it("codex: a command_execution and a file_change count as shell and edit", () => {
    const stream = [
      JSON.stringify({ type: "turn.started" }),
      JSON.stringify({ type: "item.completed", item: { id: "1", type: "command_execution", command: "npx jest src/a.test.ts" } }),
      JSON.stringify({ type: "item.completed", item: { id: "2", type: "file_change", changes: [{ path: "src/a.ts" }] } }),
    ].join("\n");

    expect(analyzeTranscript("codex", stream)).toMatchObject({ turns: 1, by_kind: { shell: 1, edit: 1 }, test_runs: 1, first_edit_index: 1 });
  });

  it("gemini: run_shell_command and replace, with a lore mcp call listed by name", () => {
    const stream = [
      JSON.stringify({ type: "tool_use", tool_name: "mcp_lore_lore_assemble_context", parameters: {} }),
      JSON.stringify({ type: "tool_use", tool_name: "run_shell_command", parameters: { command: "ls" } }),
      JSON.stringify({ type: "tool_use", tool_name: "replace", parameters: { file_path: "a.ts" } }),
    ].join("\n");

    expect(analyzeTranscript("gemini", stream)).toMatchObject({ by_kind: { mcp: 1, shell: 1, edit: 1 }, lore_calls: ["mcp_lore_lore_assemble_context"] });
  });
});
