// Retrofitting a finished cell: cut it where a loop varying one station now ends, keeping everything it replaces under artifacts/replaced.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExperimentConfig, Ticket } from "../config/experiment.js";
import { enforce } from "../core/enforce.js";
import { loopTotals } from "../core/loop-totals.js";
import { parseNumstat, structuralMetrics } from "../core/metrics.js";
import { StationRunRecordSchema, type LoopRecord, type StationRunRecord } from "../core/records.js";
import { planCut } from "../core/truncate.js";
import { diffOf, git, numstat } from "../workspace/git.js";
import type { BenchPaths } from "./paths.js";
import { appendRecord, stampOf, writeLoopJson } from "./results.js";

const SCORED_FILES = ["loop.json", "branch.bundle", "diff.patch", "dod.md", "dod-check.json", "judge.json", "judge-stdout.jsonl"];

export interface RecordedVisit {
  name: string;
  record: StationRunRecord;
}

export function visitsOf(cellDir: string): RecordedVisit[] {
  const stationsDir = join(cellDir, "stations");

  return readdirSync(stationsDir)
    .sort()
    .map((name) => ({ name, record: StationRunRecordSchema.parse(JSON.parse(readFileSync(join(stationsDir, name, "record.json"), "utf8"))) }));
}

export type CutPlan = NonNullable<ReturnType<typeof planCut>>;

export function planCellCut(cellDir: string, record: LoopRecord): { visits: RecordedVisit[]; plan: CutPlan } | null {
  const visits = visitsOf(cellDir);
  const plan = planCut(record, visits.map((visit) => visit.record));

  return plan ? { visits, plan } : null;
}

/** The last commit a kept visit pushed; a tdd-round or repair-build that pushed nothing ends on the reference branch it started from. */
export function finalHeadOf(kept: readonly RecordedVisit[], entryStation: string): string | null {
  const pushed = kept.filter((visit) => visit.record.pushed).at(-1);

  if (pushed) {
    return pushed.record.head_sha_after;
  }

  return entryStation === "dod" ? null : (kept[0]?.record.head_sha_before ?? null);
}

export async function cutCell(input: { config: ExperimentConfig; paths: BenchPaths; ticket: Ticket; cellDir: string; record: LoopRecord; visits: readonly RecordedVisit[]; plan: CutPlan; at: Date }): Promise<LoopRecord> {
  const { config, paths, ticket, cellDir, record, visits, plan } = input;
  const kept = visits.slice(0, plan.kept);
  const finalHead = finalHeadOf(kept, record.varied_station ?? "dod");
  const work = join(paths.runsDir, `cut-${Date.now()}`);
  const built = join(work, "built");
  const bundle = join(cellDir, "branch.bundle");

  enforce(finalHead === null || existsSync(bundle), `${bundle} does not exist, so the commit ${finalHead} cannot be cut from it`);
  mkdirSync(built, { recursive: true });
  const structural = finalHead === null ? null : await buildCutBranch({ config, ticket, bundle, finalHead, work, built });

  const archive = join(paths.artifactsDir, "replaced", record.cell_path, `${stampOf(input.at)}-before-cut`);

  mkdirSync(join(archive, "stations"), { recursive: true });
  SCORED_FILES.filter((file) => existsSync(join(cellDir, file))).forEach((file) => renameSync(join(cellDir, file), join(archive, file)));
  visits.slice(plan.kept).forEach((visit) => renameSync(join(cellDir, "stations", visit.name), join(archive, "stations", visit.name)));
  readdirSync(built).forEach((file) => copyFileSync(join(built, file), join(cellDir, file)));
  rmSync(work, { recursive: true, force: true });

  const cut: LoopRecord = {
    ...record,
    end_reason: plan.reason,
    rounds: plan.state.rounds,
    repairs: plan.state.repairs,
    reached_green: plan.reason === "green",
    ...loopTotals(kept.map((visit) => visit.record)),
    structural,
    dod_check: null,
    judge: null,
    final_head_sha: finalHead,
  };

  writeLoopJson(cellDir, cut);
  appendRecord(paths.resultsDir, config.id, cut);

  return cut;
}

/** Re-cuts the cell's branch at `finalHead` from its own bundle: new bundle, patch and dod.md in `built`, and the structural numbers of the cut branch. */
async function buildCutBranch(input: { config: ExperimentConfig; ticket: Ticket; bundle: string; finalHead: string; work: string; built: string }): Promise<LoopRecord["structural"]> {
  const { config, ticket, finalHead, work, built } = input;
  const branch = `loop-bench/${ticket.number}`;
  const repo = join(work, "repo.git");

  await git(["clone", "--quiet", "--bare", input.bundle, repo], work);
  await git(["update-ref", `refs/heads/${branch}`, finalHead], repo);
  await git(["bundle", "create", join(built, "branch.bundle"), branch], repo);
  writeFileSync(join(built, "diff.patch"), await diffOf(repo, ticket.base_sha, finalHead));
  const dodListing = await git(["ls-tree", "--name-only", finalHead, ".lore/dod.md"], repo);

  if (dodListing !== "") {
    writeFileSync(join(built, "dod.md"), await git(["show", `${finalHead}:.lore/dod.md`], repo));
  }

  return structuralMetrics(
    parseNumstat(await numstat(repo, ticket.base_sha, finalHead)),
    parseNumstat(await numstat(config.subject.mirror_dir, ticket.base_sha, ticket.merge_sha)),
    new RegExp(config.subject.test_file_pattern),
  );
}
