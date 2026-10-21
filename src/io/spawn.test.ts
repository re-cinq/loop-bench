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

  it("returns stdout and the exit code of a command that finishes", async () => {
    const result = await runProcess({ bin: "sh", args: ["-c", "echo hi; exit 3"], cwd: "/tmp", env: { PATH: process.env["PATH"] ?? "/usr/bin:/bin" }, timeoutMs: 5000 });

    expect(result).toMatchObject({ stdout: "hi\n", exitCode: 3, timedOut: false });
  });
});
