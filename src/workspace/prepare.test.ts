import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { runSubjectCi } from "./ci.js";
import { git, headSha } from "./git.js";
import { prepareRunWorkspace, pushedHead } from "./prepare.js";

async function fixtureRepo(): Promise<{ mirror: string; base: string }> {
  const mirror = mkdtempSync(join(tmpdir(), "loop-bench-mirror-"));

  await git(["init", "-q", "-b", "main"], mirror);
  await git(["config", "user.email", "t@t"], mirror);
  await git(["config", "user.name", "t"], mirror);
  writeFileSync(join(mirror, "a.txt"), "base\n");
  await git(["add", "."], mirror);
  await git(["commit", "-qm", "base"], mirror);
  const base = await headSha(mirror);

  writeFileSync(join(mirror, "a.txt"), "later\n");
  await git(["commit", "-qam", "later commit the replay must not see"], mirror);

  return { mirror, base };
}

describe("prepareRunWorkspace", () => {
  it("origin main is the base sha, the branch is pushed, and push/fetch/merge of origin main work offline", async () => {
    const { mirror, base } = await fixtureRepo();
    const runDir = mkdtempSync(join(tmpdir(), "loop-bench-run-"));
    const ws = await prepareRunWorkspace({
      runDir,
      mirrorDir: mirror,
      baseSha: base,
      branch: "loop-bench/1",
      ticketMarkdown: "# ticket",
      nodeModulesDir: null,
      branchBundle: null,
      roundBrief: null,
    });

    expect(await git(["rev-parse", "main"], ws.originDir)).toBe(base);
    expect(readFileSync(join(ws.targetDir, "a.txt"), "utf8")).toBe("base\n");
    expect(readFileSync(ws.ticketPath, "utf8")).toBe("# ticket");

    writeFileSync(join(ws.targetDir, "b.txt"), "agent work\n");
    await git(["add", "."], ws.targetDir);
    await git(["commit", "-qm", "round"], ws.targetDir);
    await git(["push", "-q", "origin", "HEAD"], ws.targetDir);
    await git(["fetch", "-q", "origin", "main"], ws.targetDir);
    await git(["merge", "-q", "origin/main"], ws.targetDir);

    expect(await pushedHead(ws)).toBe(await headSha(ws.targetDir));
    expect(await git(["status", "-sb"], ws.targetDir)).not.toContain("ahead");
  });

  it("runSubjectCi judges the pushed head: a check reading b.txt passes after the push and reports its tail when red", async () => {
    const { mirror, base } = await fixtureRepo();
    const runDir = mkdtempSync(join(tmpdir(), "loop-bench-run-"));
    const ws = await prepareRunWorkspace({
      runDir, mirrorDir: mirror, baseSha: base, branch: "loop-bench/1", ticketMarkdown: "", nodeModulesDir: null, branchBundle: null, roundBrief: null,
    });
    writeFileSync(join(ws.targetDir, "b.txt"), "x\n");
    await git(["add", "."], ws.targetDir);
    await git(["commit", "-qm", "round"], ws.targetDir);
    await git(["push", "-q", "origin", "HEAD"], ws.targetDir);

    const verdict = await runSubjectCi({
      originDir: ws.originDir,
      branch: ws.branch,
      checkoutDir: join(runDir, "ci-1"),
      nodeModulesDir: null,
      checks: [
        { name: "has-b", command: "test -f b.txt", timeout_minutes: 1 },
        { name: "lint", command: "echo 'b.txt:1 trailing junk' >&2; exit 1", timeout_minutes: 1 },
      ],
    });

    expect(verdict).toMatchObject({ headSha: await headSha(ws.targetDir), green: false });
    expect(verdict.checks.map((check) => [check.name, check.passed])).toEqual([["has-b", true], ["lint", false]]);
    expect(verdict.checks[1]?.tail).toContain("b.txt:1 trailing junk");
  });
});
