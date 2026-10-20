#!/usr/bin/env node
// Sits between an agent CLI and Lore's stdio MCP server and pins the store every read goes to:
// a tools/call to one of the store-reading tools gets `backend` set, whatever the agent sent.
// Usage: mcp-backend-proxy.mjs <backend> -- <server command> [args...]
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";

const READS_STORES = new Set(["lore_assemble_context", "lore_search_context", "lore_search_memory"]);
const [backend, separator, command, ...args] = process.argv.slice(2);

if (!backend || separator !== "--" || !command) {
  process.stderr.write("usage: mcp-backend-proxy.mjs <backend> -- <command> [args...]\n");
  process.exit(2);
}

const server = spawn(command, args, { stdio: ["pipe", "pipe", "inherit"], env: process.env });

server.stdout.pipe(process.stdout);
server.on("exit", (code) => process.exit(code ?? 1));

export function pinBackend(line, pinned) {
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    return line;
  }
  if (message?.method !== "tools/call" || !READS_STORES.has(message.params?.name)) {
    return line;
  }
  return JSON.stringify({ ...message, params: { ...message.params, arguments: { ...(message.params.arguments ?? {}), backend: pinned } } });
}

createInterface({ input: process.stdin }).on("line", (line) => server.stdin.write(`${pinBackend(line, backend)}\n`));
process.stdin.on("end", () => server.stdin.end());
