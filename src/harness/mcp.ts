// Lore's MCP adapter over stdio, the way install.sh registers it for a laptop.
import { join } from "node:path";
import type { McpStdioServer } from "./harness.js";

export function loreStdioServer(loreDir: string, apiUrl: string, token: string): McpStdioServer {
  return {
    name: "lore",
    command: "node",
    args: [join(loreDir, "apps", "mcp-server", "dist", "index.js")],
    env: { LORE_API_URL: apiUrl, LORE_INGEST_TOKEN: token, CONTEXT_PATH: loreDir },
  };
}
