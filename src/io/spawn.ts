// Runs one process to completion with a deadline, capturing both streams to files and in memory.
import { spawn } from "node:child_process";
import { closeSync, openSync, readFileSync } from "node:fs";

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

/**
 * A stream with a path is the file itself, opened here and handed to the child, so the child writes to disk with no pipe for this process to drain.
 * Through a pipe, a busy event loop here (the run loop's synchronous analysis and report after every loop) stopped the reading, and the claude CLI
 * then dropped the rest of its stream, the result line with it, and exited 0. A stream without a path stays a pipe read into memory.
 */
export function runProcess(spec: SpawnSpec): Promise<SpawnResult> {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const stdoutFd = spec.stdoutPath ? openSync(spec.stdoutPath, "w") : null;
    const stderrFd = spec.stderrPath ? openSync(spec.stderrPath, "w") : null;
    // Its own process group, so a timeout can end everything the CLI started: gemini relaunches itself as a child that outlives a killed launcher, at several GB.
    const child = spawn(spec.bin, spec.args, { cwd: spec.cwd, env: spec.env, stdio: ["pipe", stdoutFd ?? "pipe", stderrFd ?? "pipe"], detached: true });

    // The child holds its own copies.
    for (const fd of [stdoutFd, stderrFd]) {
      if (fd !== null) {
        closeSync(fd);
      }
    }
    const killGroup = (signal: NodeJS.Signals): void => {
      try {
        if (child.pid !== undefined) {
          process.kill(-child.pid, signal);
        }
      } catch {
        // the group is already gone
      }
    };
    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    const collected = (chunks: Buffer[], path: string | undefined): string => (path ? readFileSync(path, "utf8") : Buffer.concat(chunks).toString());
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      killGroup("SIGTERM");
      setTimeout(() => killGroup("SIGKILL"), 10_000).unref();
    }, spec.timeoutMs);

    child.stdout?.on("data", (chunk: Buffer) => stdout.push(chunk));
    child.stderr?.on("data", (chunk: Buffer) => stderr.push(chunk));
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ exitCode: null, timedOut, stdout: collected(stdout, spec.stdoutPath), stderr: `${collected(stderr, spec.stderrPath)}\n${error.message}`, wallMs: Date.now() - startedAt });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      killGroup("SIGKILL");
      resolve({ exitCode: code, timedOut, stdout: collected(stdout, spec.stdoutPath), stderr: collected(stderr, spec.stderrPath), wallMs: Date.now() - startedAt });
    });
    if (spec.stdin !== undefined) {
      child.stdin?.write(spec.stdin);
    }
    child.stdin?.end();
  });
}
