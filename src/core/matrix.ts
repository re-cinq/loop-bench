// Which loops an experiment runs: one-factor-at-a-time around the production baseline, with every cell repeated.
import { createHash } from "node:crypto";
import type { AgentChoice, ExperimentConfig, Ticket } from "../config/experiment.js";
import { StationSchema, type ContextMode, type Station } from "./harness-names.js";

export interface PlannedLoop {
  loop_id: string;
  experiment_id: string;
  ticket: Ticket;
  mode: "baseline" | "ofat" | "whole_loop";
  varied_station: Station | null;
  assignments: Record<Station, AgentChoice>;
  prompt_variant: string;
  context_mode: ContextMode;
  replicate: number;
  /** The station the loop starts at: a varied tdd-round or repair-build starts from a reference artifact. */
  entry: Station;
}

export function plannedLoops(config: ExperimentConfig): PlannedLoop[] {
  const cells = cellsOf(config);
  const repeats = replicates(config.replicates);

  const planFor = (ticket: ExperimentConfig["tickets"][number], context: ExperimentConfig["context_modes"][number]) =>
    cells.flatMap((cell) => repeats.map((replicate) => withId({ ...cell, experiment_id: config.id, ticket, context_mode: context, replicate })));

  return config.tickets.flatMap((ticket) => config.context_modes.flatMap((context) => planFor(ticket, context)));
}

type Cell = Pick<PlannedLoop, "mode" | "varied_station" | "assignments" | "prompt_variant" | "entry">;

function cellsOf(config: ExperimentConfig): Cell[] {
  const baseline: Cell = { mode: "baseline", varied_station: null, assignments: config.baseline, prompt_variant: "baseline", entry: "dod" };
  const modelVariants = StationSchema.options.flatMap((station) =>
    (config.variants[station] ?? []).map(
      (choice): Cell => ({
        mode: "ofat",
        varied_station: station,
        assignments: { ...config.baseline, [station]: choice },
        prompt_variant: "baseline",
        entry: station,
      }),
    ),
  );
  const promptVariants = StationSchema.options.flatMap((station) =>
    (config.prompt_variants[station] ?? []).map(
      (variant): Cell => ({ mode: "ofat", varied_station: station, assignments: config.baseline, prompt_variant: variant, entry: station }),
    ),
  );
  const wholeLoops = config.whole_loop.map(
    (choice): Cell => ({
      mode: "whole_loop",
      varied_station: null,
      assignments: { dod: choice, "tdd-round": choice, "repair-build": choice },
      prompt_variant: "baseline",
      entry: "dod",
    }),
  );

  return [baseline, ...modelVariants, ...promptVariants, ...wholeLoops];
}

function replicates(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index + 1);
}

function withId(loop: Omit<PlannedLoop, "loop_id">): PlannedLoop {
  const key = JSON.stringify([
    loop.experiment_id,
    loop.ticket.number,
    loop.mode,
    loop.varied_station,
    loop.assignments,
    loop.prompt_variant,
    loop.context_mode,
    loop.replicate,
  ]);

  return { ...loop, loop_id: createHash("sha256").update(key).digest("hex").slice(0, 12) };
}

export function cellPath(loop: PlannedLoop): string {
  const station = loop.varied_station ?? loop.mode;
  const varied = loop.varied_station ? loop.assignments[loop.varied_station] : loop.assignments.dod;
  const effort = varied.effort ? `-${varied.effort}` : "";
  const agent = loop.prompt_variant === "baseline" ? `${varied.harness}-${varied.model}${effort}` : `prompt-${loop.prompt_variant}`;

  return [loop.experiment_id, String(loop.ticket.number), station, agent, loop.context_mode, `rep-${loop.replicate}`].join("/");
}
