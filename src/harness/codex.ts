// codex exec --json; auth comes from CODEX_HOME, which holds only a copy of auth.json. No hook bundle exists for codex.
import { join } from "node:path";

// The pods pin codex 0.142.5, which the gpt-5.6 and gpt-6 models refuse; the bench runs its own pinned copy.
export const CODEX_BIN = join(import.meta.dirname, "..", "..", "node_modules", ".bin", "codex");
import { baseEnv, type HarnessAdapter, type InvocationSpec } from "./harness.js";

export function codexMcpOverrides(spec: InvocationSpec): string[] {
  if (!spec.mcp) {
    return [];
  }
  const prefix = `mcp_servers.${spec.mcp.name}`;

  return [
    "-c", `${prefix}.command=${JSON.stringify(spec.mcp.command)}`,
    "-c", `${prefix}.args=${JSON.stringify(spec.mcp.args)}`,
    "-c", `${prefix}.env=${tomlInlineTable(spec.mcp.env)}`,
  ];
}

function tomlInlineTable(values: Record<string, string>): string {
  return `{${Object.entries(values).map(([key, value]) => `${key}=${JSON.stringify(value)}`).join(",")}}`;
}

export const codexAdapter: HarnessAdapter = {
  name: "codex",
  versionArgs: ["--version"],
  command(spec) {
    return {
      bin: CODEX_BIN,
      args: [
        ...codexMcpOverrides(spec),
        "exec",
        "--json",
        "--model", spec.model,
        "--dangerously-bypass-approvals-and-sandbox",
        "-C", spec.workspaceDir,
        "--skip-git-repo-check",
        "--ignore-user-config",
        "--ephemeral",
        "--",
        spec.prompt,
      ],
      env: { ...baseEnv(spec), CODEX_HOME: join(spec.homeDir, "codex") },
      cwd: spec.workspaceDir,
    };
  },
  homeFiles() {
    return [];
  },
  credentialCopies() {
    return [[".codex/auth.json", "codex/auth.json"]];
  },
};
