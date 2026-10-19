// How each CLI is started: argv, env and the files its scratch HOME needs. Pure; the shell that spawns is elsewhere.
import type { Harness } from "../core/harness-names.js";

export interface McpStdioServer {
  name: string;
  command: string;
  args: string[];
  env: Record<string, string>;
}

export interface InvocationSpec {
  model: string;
  prompt: string;
  /** The directory the CLI runs in: the run's workspace, holding target/ and ticket.md. */
  workspaceDir: string;
  homeDir: string;
  mcp: McpStdioServer | null;
  extraEnv: Record<string, string>;
  /** Vertex AI project for gemini; ignored by the others. */
  gemini: { project: string; location: string } | null;
  /** The real HOME, read only for credentials. */
  userHome: string;
}

export interface FileToWrite {
  path: string;
  content: string;
  mode?: number;
}

export interface Command {
  bin: string;
  args: string[];
  env: Record<string, string>;
  cwd: string;
}

export interface HarnessAdapter {
  name: Harness;
  command(spec: InvocationSpec): Command;
  homeFiles(spec: InvocationSpec): FileToWrite[];
  /** Files copied from the user's HOME into the scratch one, as [from, to] pairs relative to each. */
  credentialCopies(spec: InvocationSpec): Array<[string, string]>;
  versionArgs: string[];
}

export function baseEnv(spec: InvocationSpec): Record<string, string> {
  return {
    HOME: spec.homeDir,
    PATH: process.env["PATH"] ?? "/usr/local/bin:/usr/bin:/bin",
    LANG: "C.UTF-8",
    TERM: "dumb",
    NO_COLOR: "1",
    CI: "true",
    ...spec.extraEnv,
  };
}
