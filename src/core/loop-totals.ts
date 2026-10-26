import type { StationRunRecord } from "./records.js";
import { EMPTY_USAGE, type Usage } from "./usage.js";

type Visit = Pick<StationRunRecord, "cost_usd" | "wall_ms" | "ci" | "usage">;

export function loopTotals(visits: readonly Visit[]): { total_cost_usd: number; total_wall_ms: number; total_usage: Usage } {
  return {
    total_cost_usd: visits.reduce((sum, visit) => sum + visit.cost_usd, 0),
    total_wall_ms: visits.reduce((sum, visit) => sum + visit.wall_ms + (visit.ci?.wall_ms ?? 0), 0),
    total_usage: visits.reduce((total, visit) => sumUsage(total, visit.usage), EMPTY_USAGE),
  };
}

function sumUsage(total: Usage, usage: Usage): Usage {
  return {
    input_tokens: total.input_tokens + usage.input_tokens,
    output_tokens: total.output_tokens + usage.output_tokens,
    cache_read_tokens: total.cache_read_tokens + usage.cache_read_tokens,
    cache_write_tokens: total.cache_write_tokens + usage.cache_write_tokens,
    reasoning_tokens: total.reasoning_tokens + usage.reasoning_tokens,
    reported_cost_usd: usage.reported_cost_usd === null ? total.reported_cost_usd : (total.reported_cost_usd ?? 0) + usage.reported_cost_usd,
    reported_duration_ms: usage.reported_duration_ms === null ? total.reported_duration_ms : (total.reported_duration_ms ?? 0) + usage.reported_duration_ms,
    tool_calls: usage.tool_calls === null ? total.tool_calls : (total.tool_calls ?? 0) + usage.tool_calls,
  };
}
