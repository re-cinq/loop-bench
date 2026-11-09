import { mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { runProcess } from "./spawn.js";

const alive = (pid: number): boolean => {
  try {
    process.kill(pid, 0);

    return true;
  } catch {
    return false;
  }
};

describe("runProcess", () => {
  it("a timeout ends the grandchild the command started, not only the command", async () => {
    const result = await runProcess({
      bin: "sh",
      args: ["-c", "sleep 300 & echo $! ; wait"],
      cwd: "/tmp",
      env: { PATH: process.env["PATH"] ?? "/usr/bin:/bin" },
      timeoutMs: 400,
    });
    const grandchild = Number(result.stdout.trim());

    expect(result.timedOut).toBe(true);
    expect(grandchild).toBeGreaterThan(1);
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(alive(grandchild)).toBe(false);
  });

  it("a stream with a path reaches its file while this process is too busy to read anything", async () => {
    const dir = mkdtempSync(join(tmpdir(), "spawn-"));
    const stdoutPath = join(dir, "stdout.jsonl");
    const bytes = 1_000_000;
    // Far more than a pipe holds: through a pipe the child stalls until this process reads, and nothing reads while the loop below runs.
    const pending = runProcess({ bin: "sh", args: ["-c", `head -c ${bytes} /dev/zero | tr '\\0' a`], cwd: dir, env: { PATH: process.env["PATH"] ?? "/usr/bin:/bin" }, timeoutMs: 10_000, stdoutPath, stderrPath: join(dir, "stderr.log") });
    const deadline = Date.now() + 3000;
    let written = 0;

    while (written < bytes && Date.now() < deadline) {
      written = statSync(stdoutPath).size;
    }
    expect(written).toBe(bytes);
    const result = await pending;

    expect(result.stdout.length).toBe(bytes);
    expect(result.exitCode).toBe(0);
  });

  it("returns stdout and the exit code of a command that finishes", async () => {
    const result = await runProcess({ bin: "sh", args: ["-c", "echo hi; exit 3"], cwd: "/tmp", env: { PATH: process.env["PATH"] ?? "/usr/bin:/bin" }, timeoutMs: 5000 });

    expect(result).toMatchObject({ stdout: "hi\n", exitCode: 3, timedOut: false });
  });
});
