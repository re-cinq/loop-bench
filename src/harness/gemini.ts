// gemini-cli headless as the pod runs it: --skip-trust (exit 55 otherwise), --yolo plus a policy that allows every tool, a 600 s request timeout, Vertex AI auth.
import { join } from "node:path";
import { baseEnv, type HarnessAdapter, type InvocationSpec } from "./harness.js";

export const BYPASS_POLICY = `[[rule]]
toolName = "*"
decision = "allow"
priority = 100
allowRedirection = true

[[rule]]
toolName = "ask_user"
decision = "deny"
priority = 200
`;

export const EXPERIMENTS = JSON.stringify({ flags: [{ flagId: 45773134, intValue: "600" }] });

export function geminiSettings(spec: InvocationSpec, hookSettings: string): string {
  const settings = JSON.parse(hookSettings) as Record<string, unknown>;
  const mcpServers = spec.mcp
    ? { [spec.mcp.name]: { command: spec.mcp.command, args: spec.mcp.args, env: spec.mcp.env, ...(spec.mcp.blockedTools.length > 0 ? { excludeTools: spec.mcp.blockedTools } : {}) } }
    : {};

  return JSON.stringify({ ...settings, mcpServers }, null, 2);
}

export const geminiAdapter: HarnessAdapter = {
  name: "gemini",
  versionArgs: ["--version"],
  command(spec) {
    const vertex = spec.gemini
      ? {
          GOOGLE_GENAI_USE_VERTEXAI: "true",
          GOOGLE_CLOUD_PROJECT: spec.gemini.project,
          GOOGLE_CLOUD_LOCATION: spec.gemini.location,
          GOOGLE_APPLICATION_CREDENTIALS: join(spec.userHome, ".config", "gcloud", "application_default_credentials.json"),
        }
      : {};

    return {
      bin: "gemini",
      args: [
        "--prompt", spec.prompt,
        "--output-format", "stream-json",
        "--model", spec.model,
        "--skip-trust",
        "--include-directories", spec.workspaceDir,
        "--yolo",
        "--policy", join(spec.homeDir, ".gemini", "bypass-policy.toml"),
      ],
      env: { ...baseEnv(spec), ...vertex, GEMINI_EXP: join(spec.homeDir, ".gemini", "experiments.json"), GEMINI_CLI_TRUST_WORKSPACE: "true" },
      cwd: spec.workspaceDir,
    };
  },
  homeFiles(spec) {
    return [
      { path: join(spec.homeDir, ".gemini", "bypass-policy.toml"), content: BYPASS_POLICY },
      { path: join(spec.homeDir, ".gemini", "experiments.json"), content: EXPERIMENTS },
    ];
  },
  credentialCopies() {
    return [];
  },
};
