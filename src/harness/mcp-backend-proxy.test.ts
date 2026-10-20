import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { lorePinnedServer, loreStdioServer } from "./mcp.js";

const PROXY = join(import.meta.dirname, "../../bin/mcp-backend-proxy.mjs");

function throughProxy(lines: readonly unknown[]): unknown[] {
  const result = spawnSync("node", [PROXY, "utopia", "--", "cat"], { input: `${lines.map((line) => JSON.stringify(line)).join("\n")}\n`, encoding: "utf8" });

  return result.stdout.trim().split("\n").map((line) => JSON.parse(line) as unknown);
}

describe("mcp-backend-proxy", () => {
  it("sets backend utopia on lore_search_memory, overriding the lore the agent asked for", () => {
    const [call] = throughProxy([{ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "lore_search_memory", arguments: { query: "x", backend: "lore" } } }]);

    expect(call).toEqual({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "lore_search_memory", arguments: { query: "x", backend: "utopia" } } });
  });

  it("leaves lore_list_repos and the initialize handshake untouched", () => {
    const sent = [
      { jsonrpc: "2.0", id: 0, method: "initialize", params: {} },
      { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "lore_list_repos", arguments: {} } },
    ];

    expect(throughProxy(sent)).toEqual(sent);
  });

  it("wraps the server command and keeps its env and blocked tools", () => {
    const pinned = lorePinnedServer(loreStdioServer("/lore", "https://api", "tok"), "/bench/bin/mcp-backend-proxy.mjs", "utopia");

    expect(pinned).toMatchObject({ command: "node", args: ["/bench/bin/mcp-backend-proxy.mjs", "utopia", "--", "node", "/lore/apps/mcp-server/dist/index.js"], env: { LORE_API_URL: "https://api" } });
    expect(pinned.blockedTools).toContain("lore_write_memory");
  });
});
