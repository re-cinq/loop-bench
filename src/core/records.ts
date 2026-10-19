// What the bench writes down: one record per station run and one per loop, appended to results.jsonl and mirrored in the cell folder.
import { z } from "zod";
import { AgentChoiceSchema } from "../config/experiment.js";
import { ContextModeSchema, HarnessSchema, StationSchema } from "./harness-names.js";
import { OutcomeSchema } from "./result-line.js";
import { UsageSchema } from "./usage.js";

export const FailureClassSchema = z.enum(["none", "no_result_line", "timeout", "spawn_error", "nonzero_exit", "infra"]);

export const StationRunRecordSchema = z.object({
  kind: z.literal("station_run"),
  experiment_id: z.string(),
  loop_id: z.string(),
  run_id: z.string(),
  ticket: z.number().int(),
  station: StationSchema,
  round: z.number().int(),
  attempt: z.number().int(),
  harness: HarnessSchema,
  model: z.string(),
  /** Recorded since 2026-10-19; older runs used each CLI's default. */
  effort: z.string().optional(),
  prompt_variant: z.string(),
  context_mode: ContextModeSchema,
  outcome: OutcomeSchema,
  extras: z.record(z.string()),
  failure_class: FailureClassSchema,
  exit_code: z.number().int().nullable(),
  usage: UsageSchema,
  cost_usd: z.number(),
  cost_basis: z.enum(["reported", "list", "unknown-model"]),
  wall_ms: z.number(),
  head_sha_before: z.string(),
  head_sha_after: z.string(),
  pushed: z.boolean(),
  ci: z.object({ green: z.boolean(), failed_checks: z.array(z.string()), head_sha: z.string(), wall_ms: z.number() }).nullable(),
  prompt_sha256_verbatim: z.string(),
  prompt_sha256_sent: z.string(),
  prompts_lore_sha: z.string(),
  cli_version: z.string(),
  started_at: z.string(),
});
export type StationRunRecord = z.infer<typeof StationRunRecordSchema>;

export const StructuralSchema = z.object({
  additions: z.number().int(),
  deletions: z.number().int(),
  files: z.number().int(),
  production_files: z.number().int(),
  test_files: z.number().int(),
  jaccard_files: z.number().min(0).max(1),
});

export const DodCheckSchema = z.object({
  acceptance_files: z.array(z.string()),
  red_on_base: z.boolean().nullable(),
  green_with_reference: z.boolean().nullable(),
  detail: z.string(),
});

export const JudgeScoresSchema = z.object({
  correctness: z.number().int().min(1).max(5),
  completeness_vs_ticket: z.number().int().min(1).max(5),
  closeness_to_reference: z.number().int().min(1).max(5),
  rationale: z.string(),
});

export const LoopRecordSchema = z.object({
  kind: z.literal("loop"),
  experiment_id: z.string(),
  loop_id: z.string(),
  cell_path: z.string(),
  ticket: z.number().int(),
  mode: z.enum(["baseline", "ofat", "whole_loop"]),
  varied_station: StationSchema.nullable(),
  assignments: z.object({ dod: AgentChoiceSchema, "tdd-round": AgentChoiceSchema, "repair-build": AgentChoiceSchema }),
  prompt_variant: z.string(),
  context_mode: ContextModeSchema,
  replicate: z.number().int(),
  end_reason: z.enum(["green", "dod_scoped_out", "round_budget", "repair_budget", "retry_budget", "error"]),
  rounds: z.number().int(),
  repairs: z.number().int(),
  reached_green: z.boolean(),
  total_cost_usd: z.number(),
  total_wall_ms: z.number(),
  total_usage: UsageSchema,
  structural: StructuralSchema.nullable(),
  dod_check: DodCheckSchema.nullable(),
  judge: JudgeScoresSchema.extend({ model: z.string() }).nullable(),
  final_head_sha: z.string().nullable(),
  started_at: z.string(),
  finished_at: z.string(),
});
export type LoopRecord = z.infer<typeof LoopRecordSchema>;

export const RecordSchema = z.discriminatedUnion("kind", [StationRunRecordSchema, LoopRecordSchema]);
export type BenchRecord = z.infer<typeof RecordSchema>;
