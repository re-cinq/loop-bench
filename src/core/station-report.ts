// Every station visit, by itself and folded per station and agent: the per-station view a loop table hides.
import type { TranscriptAnalysis } from "./analyze.js";
import type { StationRunRecord } from "./records.js";
import { formatSpread, spreadOf } from "./stats.js";

export interface VisitRow {
  record: StationRunRecord;
  analysis: TranscriptAnalysis | null;
  cellPath: string;
}

const money = (value: number): string => `$${value.toFixed(2)}`;
const minutes = (value: number): string => `${(value / 60_000).toFixed(1)} min`;
const kilo = (value: number): string => `${Math.round(value / 1000)}k`;
const one = (value: number): string => value.toFixed(1);

export function renderStationSummary(rows: readonly VisitRow[]): string {
  const groups = new Map<string, VisitRow[]>();

  for (const row of rows) {
    const key = [row.record.station, `${row.record.harness}/${row.record.model}`, row.record.context_mode, row.record.prompt_variant].join("|");

    groups.set(key, [...(groups.get(key) ?? []), row]);
  }
  const lines = [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, group]) => {
      const [station, agent, context, prompt] = key.split("|");
      const records = group.map((row) => row.record);
      const analyses = group.flatMap((row) => (row.analysis ? [row.analysis] : []));
      const judged = records.filter((record) => record.ci !== null);

      return `| ${[
        station,
        `\`${agent}\``,
        context,
        prompt,
        String(records.length),
        `${records.filter((record) => record.outcome === "success").length}/${records.length}`,
        `${records.filter((record) => record.pushed).length}/${records.length}`,
        judged.length === 0 ? "—" : `${judged.filter((record) => record.ci?.green).length}/${judged.length}`,
        formatSpread(spreadOf(records.map((record) => record.cost_usd)), money),
        formatSpread(spreadOf(records.map((record) => record.wall_ms)), minutes),
        formatSpread(spreadOf(records.map((record) => record.usage.input_tokens + record.usage.cache_read_tokens + record.usage.cache_write_tokens)), kilo),
        formatSpread(spreadOf(records.map((record) => record.usage.output_tokens + record.usage.reasoning_tokens)), kilo),
        formatSpread(spreadOf(analyses.map((analysis) => analysis.tool_calls)), one),
        String(analyses.reduce((sum, analysis) => sum + analysis.guard_blocked, 0)),
        String(analyses.reduce((sum, analysis) => sum + analysis.test_runs, 0)),
        String(analyses.reduce((sum, analysis) => sum + analysis.lore_calls.length, 0)),
        String(records.filter((record) => record.failure_class !== "none").length),
      ].join(" | ")} |`;
    });

  return [
    "| Station | Agent | Context | Prompt | Visits | Reported success | Pushed | CI green after | Cost per visit | Time per visit | Tokens in | Tokens out | Tool calls | Guard refusals | Test runs | Lore calls | Broken runs |",
    "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
    ...lines,
  ].join("\n");
}
