// Lore's MCP adapter over stdio, the way install.sh registers it for a laptop.
import { join } from "node:path";
import type { McpStdioServer } from "./harness.js";

/** Lore tools that change shared state: memory, tasks, plans, ingestion, the local runner. The bench gives agents Lore to read, never to write, so no run can leave behind what a later run then finds. */
export const LORE_WRITE_TOOLS = [
  "lore_write_memory",
  "lore_write_episode",
  "lore_delete_memory",
  "lore_create_pipeline_task",
  "lore_cancel_task",
  "lore_retry_task",
  "lore_skip_task",
  "lore_claim_task",
  "lore_complete_task",
  "lore_sync_tasks",
  "lore_onboard_repo",
  "lore_ingest_files",
  "lore_plan_edit",
  "lore_update",
  "lore_run_task_locally",
  "lore_claim_and_run_locally",
  "lore_cancel_local_task",
  "lore_configure_local_runner",
  "lore_enable_task_notifications",
  "lore_disable_task_notifications",
] as const;

export function loreStdioServer(loreDir: string, apiUrl: string, token: string): McpStdioServer {
  return {
    name: "lore",
    command: "node",
    args: [join(loreDir, "apps", "mcp-server", "dist", "index.js")],
    env: { LORE_API_URL: apiUrl, LORE_INGEST_TOKEN: token, CONTEXT_PATH: loreDir },
    blockedTools: [...LORE_WRITE_TOOLS],
  };
}

/** Lore's MCP server with every store read pinned to `backend` by a local proxy: the same tools, a different store underneath. */
export function lorePinnedServer(server: McpStdioServer, proxyPath: string, backend: string): McpStdioServer {
  return { ...server, command: "node", args: [proxyPath, backend, "--", server.command, ...server.args] };
}
