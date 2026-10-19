import { describe, expect, it } from "vitest";
import { claudeAdapter } from "./claude.js";
import { codexAdapter } from "./codex.js";
import { geminiAdapter, geminiSettings } from "./gemini.js";
import type { InvocationSpec } from "./harness.js";
import { loreStdioServer } from "./mcp.js";

const spec: InvocationSpec = {
  model: "m",
  prompt: "do it",
  workspaceDir: "/r/workspace",
  homeDir: "/r/home",
  mcp: null,
  extraEnv: { LORE_ACCEPTANCE_DOD: "/r/workspace/target/.lore/dod.md" },
  gemini: { project: "p", location: "global" },
  userHome: "/home/u",
};
const withLore = { ...spec, mcp: loreStdioServer("/lore", "https://api", "tok") };

describe("claude command", () => {
  it("runs --print stream-json with the model, skip-permissions, the scratch settings file and the prompt last", () => {
    const command = claudeAdapter.command(spec);

    expect(command.args).toEqual([
      "--print", "--verbose", "--output-format", "stream-json", "--model", "m", "--dangerously-skip-permissions",
      "--settings", "/r/home/.claude/settings.json", "--strict-mcp-config", "--", "do it",
    ]);
    expect(command.env).toMatchObject({ HOME: "/r/home", LORE_ACCEPTANCE_DOD: "/r/workspace/target/.lore/dod.md" });
  });

  it("renders the lore stdio server as --mcp-config JSON with --strict-mcp-config", () => {
    const args = claudeAdapter.command(withLore).args;
    const config = JSON.parse(args[args.indexOf("--mcp-config") + 1] ?? "{}");

    expect(config).toEqual({
      mcpServers: { lore: { type: "stdio", command: "node", args: ["/lore/apps/mcp-server/dist/index.js"], env: { LORE_API_URL: "https://api", LORE_INGEST_TOKEN: "tok", CONTEXT_PATH: "/lore" } } },
    });
  });
});

describe("gemini command", () => {
  it("passes --skip-trust, --yolo, the bypass policy and the Vertex env for project p", () => {
    const command = geminiAdapter.command(spec);

    expect(command.args).toEqual([
      "--prompt", "do it", "--output-format", "stream-json", "--model", "m", "--skip-trust",
      "--include-directories", "/r/workspace", "--yolo", "--policy", "/r/home/.gemini/bypass-policy.toml",
    ]);
    expect(command.env).toMatchObject({
      GOOGLE_GENAI_USE_VERTEXAI: "true",
      GOOGLE_CLOUD_PROJECT: "p",
      GOOGLE_CLOUD_LOCATION: "global",
      GEMINI_EXP: "/r/home/.gemini/experiments.json",
    });
  });

  it("settings.json keeps the hook bundle and adds the lore server under mcpServers", () => {
    const settings = JSON.parse(geminiSettings(withLore, '{"hooks":{"BeforeTool":[]}}'));

    expect(settings).toEqual({
      hooks: { BeforeTool: [] },
      mcpServers: { lore: { command: "node", args: ["/lore/apps/mcp-server/dist/index.js"], env: { LORE_API_URL: "https://api", LORE_INGEST_TOKEN: "tok", CONTEXT_PATH: "/lore" } } },
    });
  });
});

describe("codex command", () => {
  it("runs exec --json with the bypass flag, the workspace as -C, no user config, and CODEX_HOME in the scratch home", () => {
    const command = codexAdapter.command(spec);

    expect(command.args).toEqual([
      "exec", "--json", "--model", "m", "--dangerously-bypass-approvals-and-sandbox", "-C", "/r/workspace",
      "--skip-git-repo-check", "--ignore-user-config", "--ephemeral", "--", "do it",
    ]);
    expect(command.env["CODEX_HOME"]).toBe("/r/home/codex");
  });

  it("renders the lore server as -c mcp_servers.lore.* overrides before exec", () => {
    expect(codexAdapter.command(withLore).args.slice(0, 6)).toEqual([
      "-c", 'mcp_servers.lore.command="node"',
      "-c", 'mcp_servers.lore.args=["/lore/apps/mcp-server/dist/index.js"]',
      "-c", 'mcp_servers.lore.env={LORE_API_URL="https://api",LORE_INGEST_TOKEN="tok",CONTEXT_PATH="/lore"}',
    ]);
  });
});
