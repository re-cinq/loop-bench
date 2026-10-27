import { describe, expect, it } from "vitest";
import { loreStdioServer } from "../harness/mcp.js";
import { qaClaudeCommand, qaHomeFiles, qaMcpConfig, type QaInvocation } from "./arms.js";

const invocation: QaInvocation = { model: "claude-sonnet-5-5", effort: "medium", prompt: "Q", runDir: "/r/run", homeDir: "/r/home", mcp: null };
const utopia = { name: "utopia", url: "http://127.0.0.1:18080/api/v1/kbs/kb-1/mcp", headers: { Authorization: "Bearer utp_pat_x" }, blockedTools: ["remember"] };

describe("qaClaudeCommand", () => {
  it("starts the none arm with no built-in tool and an empty strict MCP config, prompt last", () => {
    expect(qaClaudeCommand(invocation)).toMatchObject({
      bin: "claude",
      cwd: "/r/run",
      args: [
        "--print", "--verbose", "--output-format", "stream-json", "--model", "claude-sonnet-5-5", "--effort", "medium",
        "--dangerously-skip-permissions", "--no-session-persistence", "--settings", "/r/home/.claude/settings.json",
        "--tools", "", "--strict-mcp-config", "--", "Q",
      ],
      env: { HOME: "/r/home" },
    });
  });

  it("gives the lore arm the stdio adapter and disallows lore_write_memory", () => {
    const args = qaClaudeCommand({ ...invocation, mcp: loreStdioServer("/lore", "https://api", "tok") }).args;

    expect(args.slice(args.indexOf("--disallowedTools"))).toContain("mcp__lore__lore_write_memory");
  });

  it("gives the utopia arm an http server with its bearer header", () => {
    expect(JSON.parse(qaMcpConfig(utopia))).toEqual({
      mcpServers: { utopia: { type: "http", url: "http://127.0.0.1:18080/api/v1/kbs/kb-1/mcp", headers: { Authorization: "Bearer utp_pat_x" } } },
    });
  });
});

describe("qaHomeFiles", () => {
  it("writes an empty settings file and the onboarding flags into the scratch HOME", () => {
    expect(qaHomeFiles("/r/home").map((file) => [file.path, file.content])).toEqual([
      ["/r/home/.claude/settings.json", "{}"],
      ["/r/home/.claude.json", JSON.stringify({ hasCompletedOnboarding: true, bypassPermissionsModeAccepted: true })],
    ]);
  });
});
