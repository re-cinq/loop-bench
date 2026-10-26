// Judging as Vertex batch jobs: submit the loops without a judge score, check on the jobs, collect their answers into the cells.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { GoogleGenAI, JobState } from "@google/genai";
import type { ExperimentConfig } from "../config/experiment.js";
import { batchRequestLine, BatchManifestSchema, cellsWithoutOpenJob, promptKey, repliesByPromptKey, type BatchJob, type BatchManifest } from "../core/judge-batch.js";
import { enforce } from "../core/enforce.js";
import { runProcess } from "../io/spawn.js";
import { diffOf } from "../workspace/git.js";
import type { BenchPaths } from "./paths.js";
import { appendRecord, readLoopJson, writeLoopJson } from "./results.js";
import { finishedLoopsOnDisk, toJudge } from "./score-missing.js";
import { envOf, judgePromptOf, recordJudgeVerdict, withScores } from "./score.js";

interface BatchContext {
  config: ExperimentConfig;
  paths: BenchPaths;
  log: (line: string) => void;
}

const END_STATES: ReadonlySet<JobState> = new Set([JobState.JOB_STATE_SUCCEEDED, JobState.JOB_STATE_FAILED, JobState.JOB_STATE_CANCELLED, JobState.JOB_STATE_EXPIRED]);

const manifestPath = (context: BatchContext): string => join(context.paths.resultsDir, context.config.id, "judge-batches.json");

function readManifest(context: BatchContext): BatchManifest {
  const path = manifestPath(context);

  return existsSync(path) ? BatchManifestSchema.parse(JSON.parse(readFileSync(path, "utf8"))) : { jobs: [] };
}

function writeManifest(context: BatchContext, manifest: BatchManifest): void {
  writeFileSync(manifestPath(context), JSON.stringify(BatchManifestSchema.parse(manifest), null, 2));
}

function batchSettings(config: ExperimentConfig): { gcsPrefix: string; project: string; location: string } {
  enforce(config.judge.harness === "gemini", "batch judging runs on Vertex, so the judge harness must be gemini");
  enforce(config.judge.batch && config.gemini, "batch judging needs judge.batch.gcs_prefix and the gemini project in the experiment file");

  return { gcsPrefix: config.judge.batch.gcs_prefix.replace(/\/$/, ""), project: config.gemini.project, location: config.judge.batch.location ?? config.gemini.location };
}

const vertexClient = (config: ExperimentConfig): GoogleGenAI => {
  const { project, location } = batchSettings(config);

  return new GoogleGenAI({ vertexai: true, project, location });
};

async function gcloud(context: BatchContext, args: readonly string[]): Promise<string> {
  const result = await runProcess({ bin: "gcloud", args, cwd: context.paths.root, env: envOf(), timeoutMs: 15 * 60_000 });

  enforce(result.exitCode === 0, `gcloud ${args.slice(0, 3).join(" ")} failed: ${result.stderr.slice(-500)}`);

  return result.stdout;
}

/** One job with a request per distinct prompt, for every finished loop that has no judge score and no job already out for it. */
export async function submitJudgeBatch(context: BatchContext): Promise<void> {
  const { gcsPrefix } = batchSettings(context.config);
  const manifest = readManifest(context);
  const unjudged = toJudge(finishedLoopsOnDisk(context.paths.resultsDir, context.config.id), { index: 0, count: 1 });
  const idle = new Set(cellsWithoutOpenJob(manifest, unjudged.map(({ cellDir }) => relative(context.paths.resultsDir, cellDir))));
  const todo = unjudged.filter(({ cellDir }) => idle.has(relative(context.paths.resultsDir, cellDir)));
  const referenceDiffs = new Map(
    await Promise.all(
      context.config.tickets.map(async (ticket) => [ticket.number, await diffOf(context.config.subject.mirror_dir, ticket.base_sha, ticket.merge_sha)] as const),
    ),
  );
  const prompts = new Map<string, { prompt: string; cells: string[] }>();

  for (const { cellDir, record } of todo) {
    const ticket = context.config.tickets.find((candidate) => candidate.number === record.ticket);
    const referenceDiff = referenceDiffs.get(record.ticket);
    const prompt = ticket && referenceDiff !== undefined ? judgePromptOf({ ...context, ticket, cellDir, referenceDiff }) : null;

    if (prompt === null) {
      context.log(`[loop-bench] no ticket or no diff for ${relative(context.paths.resultsDir, cellDir)}, left out of the batch`);
      continue;
    }
    const key = promptKey(prompt);

    prompts.set(key, { prompt, cells: [...(prompts.get(key)?.cells ?? []), relative(context.paths.resultsDir, cellDir)] });
  }
  if (prompts.size === 0) {
    return context.log("[loop-bench] no loop is waiting for a judge score outside a running batch");
  }
  const stamp = new Date().toISOString().replaceAll(/[:.]/g, "-");
  const folder = `${gcsPrefix}/${context.config.id}/${stamp}`;
  const localInput = join(context.paths.runsDir, `judge-batch-${stamp}.jsonl`);

  mkdirSync(context.paths.runsDir, { recursive: true });
  writeFileSync(localInput, `${[...prompts.values()].map(({ prompt }) => batchRequestLine(prompt)).join("\n")}\n`);
  await gcloud(context, ["storage", "cp", localInput, `${folder}/input.jsonl`]);
  rmSync(localInput, { force: true });
  const job = await vertexClient(context.config).batches.create({
    model: context.config.judge.model,
    src: `${folder}/input.jsonl`,
    config: { dest: `${folder}/output/`, displayName: `loop-bench-judge-${context.config.id}-${stamp}` },
  });

  enforce(job.name, "Vertex created a batch job without a name");
  const submitted: BatchJob = {
    name: job.name,
    model: context.config.judge.model,
    submitted_at: new Date().toISOString(),
    output_uri: `${folder}/output/`,
    cells: Object.fromEntries([...prompts].map(([key, { cells }]) => [key, cells])),
    collected_at: null,
  };

  writeManifest(context, { jobs: [...manifest.jobs, submitted] });
  context.log(`[loop-bench] submitted ${prompts.size} requests for ${[...prompts.values()].flatMap(({ cells }) => cells).length} cells as ${job.name}`);
}

export async function judgeBatchStatus(context: BatchContext): Promise<void> {
  const client = vertexClient(context.config);

  for (const job of readManifest(context).jobs.filter(({ collected_at }) => collected_at === null)) {
    const current = await client.batches.get({ name: job.name });

    context.log(`[loop-bench] ${job.name}: ${current.state ?? "unknown"}, ${Object.values(job.cells).flat().length} cells, submitted ${job.submitted_at}`);
  }
}

/** Applies the answers of every job that has ended. A job that failed is closed without answers, which frees its cells for the next submit. */
export async function collectJudgeBatches(context: BatchContext): Promise<void> {
  const client = vertexClient(context.config);
  const manifest = readManifest(context);
  const jobs: BatchJob[] = [];

  for (const job of manifest.jobs) {
    const current = job.collected_at === null ? await client.batches.get({ name: job.name }) : null;
    const ended = current?.state !== undefined && END_STATES.has(current.state);

    if (!current || !ended) {
      jobs.push(job);
      continue;
    }
    const closed = { ...job, collected_at: new Date().toISOString() };

    if (current.state !== JobState.JOB_STATE_SUCCEEDED) {
      context.log(`[loop-bench] ${job.name} ended ${current.state}: ${current.error?.message ?? "no reason given"}`);
      jobs.push(closed);
      continue;
    }
    const outputFolder = (current.dest?.gcsUri ?? job.output_uri).replace(/\/$/, "");

    applyAnswers(context, job, await gcloud(context, ["storage", "cat", `${outputFolder}/**/predictions*.jsonl`]));
    jobs.push(closed);
  }
  writeManifest(context, { jobs });
}

function applyAnswers(context: BatchContext, job: BatchJob, outputJsonl: string): void {
  const replies = repliesByPromptKey(outputJsonl);
  const answered = Object.entries(job.cells).flatMap(([key, cells]) => cells.map((cell) => ({ cell, text: replies.get(key) })));
  let judged = 0;

  for (const { cell, text } of answered) {
    const cellDir = join(context.paths.resultsDir, cell);
    const record = text === undefined ? null : readLoopJson(cellDir);
    const verdict = record && text !== undefined ? recordJudgeVerdict({ config: context.config, cellDir, text }) : null;

    if (record && verdict) {
      const scored = withScores(record, null, verdict);

      writeLoopJson(cellDir, scored);
      appendRecord(context.paths.resultsDir, context.config.id, scored);
      judged += 1;
    }
  }
  context.log(`[loop-bench] ${job.name}: ${judged} of ${answered.length} cells judged`);
}
