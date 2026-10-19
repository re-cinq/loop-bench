// Runs one process to completion with a deadline, capturing both streams to files and in memory.
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";

export interface SpawnSpec {
  bin: string;
  args: readonly string[];
  cwd: string;
  env: Record<string, string>;
  timeoutMs: number;
  stdoutPath?: string;
  stderrPath?: string;
  stdin?: string;
}

export interface SpawnResult {
  exitCode: number | null;
  timedOut: boolean;
  stdout: string;
  stderr: string;
  wallMs: number;
}

export function runProcess(spec: SpawnSpec): Promise<SpawnResult> {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const child = spawn(spec.bin, spec.args, { cwd: spec.cwd, env: spec.env, stdio: ["pipe", "pipe", "pipe"] });
    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    const stdoutFile = spec.stdoutPath ? createWriteStream(spec.stdoutPath) : null;
    const stderrFile = spec.stderrPath ? createWriteStream(spec.stderrPath) : null;
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      setTimeout(() => child.kill("SIGKILL"), 10_000).unref();
    }, spec.timeoutMs);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout.push(chunk);
      stdoutFile?.write(chunk);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr.push(chunk);
      stderrFile?.write(chunk);
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ exitCode: null, timedOut, stdout: Buffer.concat(stdout).toString(), stderr: `${Buffer.concat(stderr).toString()}\n${error.message}`, wallMs: Date.now() - startedAt });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      stdoutFile?.end();
      stderrFile?.end();
      resolve({ exitCode: code, timedOut, stdout: Buffer.concat(stdout).toString(), stderr: Buffer.concat(stderr).toString(), wallMs: Date.now() - startedAt });
    });
    if (spec.stdin !== undefined) {
      child.stdin.write(spec.stdin);
    }
    child.stdin.end();
  });
}
