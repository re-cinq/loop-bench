// claude --print as the ai-agent-subsystem pod runs it; hooks and skills live in the scratch HOME's .claude.
import { join } from "node:path";
import { baseEnv, type HarnessAdapter, type InvocationSpec } from "./harness.js";

export function claudeMcpConfig(spec: InvocationSpec): string | null {
  return spec.mcp
    ? JSON.stringify({ mcpServers: { [spec.mcp.name]: { type: "stdio", command: spec.mcp.command, args: spec.mcp.args, env: spec.mcp.env } } })
    : null;
}

export const claudeAdapter: HarnessAdapter = {
  name: "claude",
  versionArgs: ["--version"],
  command(spec) {
    const mcp = claudeMcpConfig(spec);

    return {
      bin: "claude",
      args: [
        "--print",
        "--verbose",
        "--output-format", "stream-json",
        "--model", spec.model,
        ...(spec.effort ? ["--effort", spec.effort] : []),
        "--dangerously-skip-permissions",
        "--settings", join(spec.homeDir, ".claude", "settings.json"),
        ...(mcp ? ["--mcp-config", mcp, "--strict-mcp-config"] : ["--strict-mcp-config"]),
        "--",
        spec.prompt,
      ],
      env: { ...baseEnv(spec), DISABLE_AUTOUPDATER: "1", CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1" },
      cwd: spec.workspaceDir,
    };
  },
  homeFiles(spec) {
    return [{ path: join(spec.homeDir, ".claude.json"), content: JSON.stringify({ hasCompletedOnboarding: true, bypassPermissionsModeAccepted: true }) }];
  },
  credentialCopies() {
    return [[".claude/.credentials.json", ".claude/.credentials.json"]];
  },
};
