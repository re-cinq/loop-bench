// A run's workspace: a bare `origin` whose main is the ticket's base, a clone of it on the ticket branch, the ticket file, and the dependencies copied in. Every git assumption the prompts make (push origin HEAD, fetch origin main, merge) holds offline.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { copyDeps } from "./deps-cache.js";
import { git } from "./git.js";

export interface WorkspaceInput {
  runDir: string;
  mirrorDir: string;
  baseSha: string;
  branch: string;
  ticketMarkdown: string;
  nodeModulesDir: string | null;
  /** A git bundle holding the branch as an earlier station left it; the branch starts from the base otherwise. */
  branchBundle: string | null;
  roundBrief: string | null;
}

export interface RunWorkspace {
  workspaceDir: string;
  targetDir: string;
  originDir: string;
  ticketPath: string;
  roundBriefPath: string;
  branch: string;
}

export async function prepareRunWorkspace(input: WorkspaceInput): Promise<RunWorkspace> {
  const workspaceDir = join(input.runDir, "workspace");
  const originDir = join(input.runDir, "origin.git");
  const targetDir = join(workspaceDir, "target");

  mkdirSync(workspaceDir, { recursive: true });
  await git(["clone", "--quiet", "--bare", input.mirrorDir, originDir], input.runDir);
  await git(["update-ref", "refs/heads/main", input.baseSha], originDir);
  await git(["symbolic-ref", "HEAD", "refs/heads/main"], originDir);
  await git(["for-each-ref", "--format=%(refname)", "refs/heads"], originDir).then((refs) =>
    Promise.all(
      refs
        .split("\n")
        .filter((ref) => ref !== "" && ref !== "refs/heads/main")
        .map((ref) => git(["update-ref", "-d", ref], originDir)),
    ),
  );
  await git(["clone", "--quiet", originDir, targetDir], workspaceDir);
  await git(["config", "user.name", "loop-bench"], targetDir);
  await git(["config", "user.email", "loop-bench@localhost"], targetDir);

  if (input.branchBundle) {
    await git(["fetch", "--quiet", input.branchBundle, `refs/heads/${input.branch}:refs/heads/${input.branch}`], targetDir);
    await git(["checkout", "--quiet", input.branch], targetDir);
  } else {
    await git(["checkout", "--quiet", "-b", input.branch], targetDir);
  }
  await git(["push", "--quiet", "-u", "origin", input.branch], targetDir);

  const ticketPath = join(workspaceDir, "ticket.md");
  const roundBriefPath = join(workspaceDir, "round-brief.md");

  writeFileSync(ticketPath, input.ticketMarkdown);
  if (input.roundBrief !== null) {
    writeFileSync(roundBriefPath, input.roundBrief);
  }
  if (input.nodeModulesDir && existsSync(input.nodeModulesDir)) {
    await copyDeps(input.nodeModulesDir, targetDir);
  }

  return { workspaceDir, targetDir, originDir, ticketPath, roundBriefPath, branch: input.branch };
}

/** The branch head as the agent left it on origin: what CI judges, not the working tree. */
export async function pushedHead(workspace: RunWorkspace): Promise<string | null> {
  try {
    return await git(["rev-parse", `refs/heads/${workspace.branch}`], workspace.originDir);
  } catch {
    return null;
  }
}
