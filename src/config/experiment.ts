// The experiment file: subject repository, reference tickets, the baseline agent per station and what to vary.
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { z } from "zod";
import { ContextModeSchema, HarnessSchema, StationSchema } from "../core/harness-names.js";

export const AgentChoiceSchema = z.object({ harness: HarnessSchema, model: z.string().min(1) });
export type AgentChoice = z.infer<typeof AgentChoiceSchema>;

const CiCheckSchema = z.object({ name: z.string(), command: z.string(), timeout_minutes: z.number().default(10) });
export type CiCheck = z.infer<typeof CiCheckSchema>;

export const TicketSchema = z.object({
  number: z.number().int(),
  title: z.string(),
  ticket_file: z.string(),
  reference_pr: z.number().int(),
  merge_sha: z.string().regex(/^[0-9a-f]{12,40}$/),
  base_sha: z.string().regex(/^[0-9a-f]{12,40}$/),
});
export type Ticket = z.infer<typeof TicketSchema>;

const SubjectSchema = z.object({
  repo: z.string().regex(/^[^/]+\/[^/]+$/),
  mirror_dir: z.string(),
  default_branch: z.string().default("main"),
  install_command: z.string().default("npm ci"),
  ci_checks: z.array(CiCheckSchema).min(1),
  test_file_pattern: z.string().default("\\.(test|spec)\\.[cm]?[jt]sx?$"),
});

const StationMap = <T extends z.ZodTypeAny>(value: T) =>
  z.object({ dod: value, "tdd-round": value, "repair-build": value });

export const ExperimentConfigSchema = z.object({
  id: z.string().min(1),
  subject: SubjectSchema,
  tickets: z.array(TicketSchema).min(1),
  baseline: StationMap(AgentChoiceSchema),
  variants: StationMap(z.array(AgentChoiceSchema).default([])).partial(),
  prompt_variants: StationMap(z.array(z.string()).default([])).partial(),
  whole_loop: z.array(AgentChoiceSchema).default([]),
  context_modes: z.array(ContextModeSchema).min(1).default(["none"]),
  replicates: z.number().int().min(1).default(5),
  station_timeout_minutes: StationMap(z.number()).default({ dod: 60, "tdd-round": 60, "repair-build": 45 }),
  lore_mcp: z
    .object({ lore_dir: z.string(), api_url_env: z.string().default("LORE_API_URL"), token_env: z.string().default("LORE_INGEST_TOKEN") })
    .optional(),
  judge: z.object({ harness: HarnessSchema, model: z.string(), diff_cap_chars: z.number().default(60_000) }),
  gemini: z.object({ project: z.string(), location: z.string().default("global") }).optional(),
});
export type ExperimentConfig = z.infer<typeof ExperimentConfigSchema>;

export function loadExperiment(path: string): ExperimentConfig {
  return ExperimentConfigSchema.parse(parse(readFileSync(path, "utf8")));
}

export { StationSchema };
