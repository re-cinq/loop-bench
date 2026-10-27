// The three arms of the context-qa experiment and the fresh claude each one starts: the same prompt, model and empty run dir, only the MCP server differs.
import { join } from "node:path";
import { z } from "zod";
import { baseEnv, type Command, type FileToWrite, type McpStdioServer } from "../harness/harness.js";

export const ArmSchema = z.enum(["none", "lore", "utopia"]);
export type Arm = z.infer<typeof ArmSchema>;

export interface McpHttpServer {
  name: string;
  url: string;
  headers: Record<string, string>;
  blockedTools: string[];
}

export interface QaInvocation {
  model: string;
  effort: string;
  prompt: string;
  runDir: string;
  homeDir: string;
  mcp: McpStdioServer | McpHttpServer | null;
  /** How long claude waits on one MCP call before failing it; its own default when unset. */
  mcpToolTimeoutMs?: number;
}

export function qaAnswerPrompt(repo: string, question: string): string {
  return `Answer this question about the repository ${repo}. You cannot read the repository's files: your only sources are what you already know and the tools listed to you, if any. If you cannot find the answer, say you do not know rather than guess.

Reply with a single JSON object and nothing else: {"answer": "...", "sources": ["..."]}, where sources lists the documents, files, commits, issues or pull requests your answer relies on (empty when none).

Question: ${question}`;
}

export function qaMcpConfig(mcp: McpStdioServer | McpHttpServer): string {
  const server = "url" in mcp ? { type: "http", url: mcp.url, headers: mcp.headers } : { type: "stdio", command: mcp.command, args: mcp.args, env: mcp.env };

  return JSON.stringify({ mcpServers: { [mcp.name]: server } });
}

/** claude --print with no built-in tool (`--tools ""`), no MCP server but the arm's, nothing from the user's settings, and no session written. */
export function qaClaudeCommand(invocation: QaInvocation): Command {
  const { mcp } = invocation;
  const blocked = mcp ? mcp.blockedTools.map((tool) => `mcp__${mcp.name}__${tool}`) : [];

  return {
    bin: "claude",
    args: [
      "--print",
      "--verbose",
      "--output-format", "stream-json",
      "--model", invocation.model,
      "--effort", invocation.effort,
      "--dangerously-skip-permissions",
      "--no-session-persistence",
      "--settings", join(invocation.homeDir, ".claude", "settings.json"),
      "--tools", "",
      ...(mcp ? ["--mcp-config", qaMcpConfig(mcp)] : []),
      "--strict-mcp-config",
      ...(blocked.length > 0 ? ["--disallowedTools", ...blocked] : []),
      "--",
      invocation.prompt,
    ],
    env: baseEnv({ homeDir: invocation.homeDir, extraEnv: {
        DISABLE_AUTOUPDATER: "1",
        CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1",
        ...(invocation.mcpToolTimeoutMs === undefined ? {} : { MCP_TOOL_TIMEOUT: String(invocation.mcpToolTimeoutMs) }),
      },
    }),
    cwd: invocation.runDir,
  };
}

/** The scratch HOME's own files: an empty settings file and the onboarding flags. Only the credentials are copied from the user's HOME. */
export function qaHomeFiles(homeDir: string): FileToWrite[] {
  return [
    { path: join(homeDir, ".claude", "settings.json"), content: "{}" },
    { path: join(homeDir, ".claude.json"), content: JSON.stringify({ hasCompletedOnboarding: true, bypassPermissionsModeAccepted: true }) },
  ];
}
