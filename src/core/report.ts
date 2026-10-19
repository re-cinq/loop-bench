// The results as a table per cell, replicates folded into mean and spread, in the shape of docs/building-lore/decompose-model-comparison.md.
import { effortLabel } from "./effort.js";
import type { LoopRecord } from "./records.js";
import { formatSpread, spreadOf } from "./stats.js";
import type { VisitRow } from "./station-report.js";

export interface CellSummary {
  key: string;
  ticket: number;
  station: string;
  agent: string;
  effort: string;
  context: string;
  prompt: string;
  loops: LoopRecord[];
}

export function cellsOf(loops: readonly LoopRecord[]): CellSummary[] {
  const byKey = new Map<string, CellSummary>();

  for (const loop of loops) {
    const station = loop.varied_station ?? loop.mode;
    const choice = loop.varied_station ? loop.assignments[loop.varied_station] : loop.assignments.dod;
    const agent = `${choice.harness}/${choice.model}`;
    const effort = effortLabel(choice.harness, choice.model, choice.effort);
    const key = [loop.ticket, station, agent, effort, loop.context_mode, loop.prompt_variant].join("|");
    const cell = byKey.get(key) ?? { key, ticket: loop.ticket, station, agent, effort, context: loop.context_mode, prompt: loop.prompt_variant, loops: [] };

    cell.loops.push(loop);
    byKey.set(key, cell);
  }

  return [...byKey.values()].sort(compareCells);
}

function compareCells(a: CellSummary, b: CellSummary): number {
  return a.ticket - b.ticket || a.station.localeCompare(b.station) || score(b) - score(a) || a.agent.localeCompare(b.agent);
}

/** The sort score: green share first, then judge mean, then cheaper. */
function score(cell: CellSummary): number {
  const green = cell.loops.filter((loop) => loop.reached_green).length / cell.loops.length;
  const judge = spreadOf(cell.loops.flatMap((loop) => (loop.judge ? [loop.judge.correctness + loop.judge.completeness_vs_ticket] : [])))?.mean ?? 0;
  const cost = spreadOf(cell.loops.map((loop) => loop.total_cost_usd))?.mean ?? 0;

  return green * 100 + judge * 5 - cost;
}

const money = (value: number): string => `$${value.toFixed(2)}`;
const minutes = (value: number): string => `${(value / 60_000).toFixed(1)} min`;
const one = (value: number): string => value.toFixed(1);
const count = (value: number): string => String(Math.round(value));

export function renderResultsTable(cells: readonly CellSummary[]): string {
  const header = [
    "| Ticket | Station varied | Agent | Effort | Context | Prompt | Runs | Reached green | Rounds | Cost per loop | Time per loop | Judge correctness | Judge completeness | Judge closeness | dod red→green | Files (Jaccard vs PR) | +/− lines |",
    "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
  ];
  const rows = cells.map((cell) => {
    const loops = cell.loops;
    const judged = loops.flatMap((loop) => (loop.judge ? [loop.judge] : []));
    const dod = loops.flatMap((loop) => (loop.dod_check ? [loop.dod_check] : []));
    const structural = loops.flatMap((loop) => (loop.structural ? [loop.structural] : []));

    return `| ${[
      `#${cell.ticket}`,
      cell.station,
      `\`${cell.agent}\``,
      cell.effort,
      cell.context,
      cell.prompt,
      String(loops.length),
      `${loops.filter((loop) => loop.reached_green).length}/${loops.length}`,
      formatSpread(spreadOf(loops.map((loop) => loop.rounds)), one),
      formatSpread(spreadOf(loops.map((loop) => loop.total_cost_usd)), money),
      formatSpread(spreadOf(loops.map((loop) => loop.total_wall_ms)), minutes),
      formatSpread(spreadOf(judged.map((judge) => judge.correctness)), one),
      formatSpread(spreadOf(judged.map((judge) => judge.completeness_vs_ticket)), one),
      formatSpread(spreadOf(judged.map((judge) => judge.closeness_to_reference)), one),
      dod.length === 0 ? "—" : `${dod.filter((check) => check.red_on_base && check.green_with_reference).length}/${dod.length}`,
      formatSpread(spreadOf(structural.map((item) => item.files)), count) + (structural.length ? ` (${formatSpread(spreadOf(structural.map((item) => item.jaccard_files)), (value) => value.toFixed(2))})` : ""),
      structural.length ? `+${count(spreadOf(structural.map((item) => item.additions))?.mean ?? 0)}/−${count(spreadOf(structural.map((item) => item.deletions))?.mean ?? 0)}` : "—",
    ].join(" | ")} |`;
  });

  return [...header, ...rows].join("\n");
}

export function renderEndReasons(cells: readonly CellSummary[]): string {
  const rows = cells.map((cell) => {
    const reasons = new Map<string, number>();

    for (const loop of cell.loops) {
      reasons.set(loop.end_reason, (reasons.get(loop.end_reason) ?? 0) + 1);
    }

    return `| #${cell.ticket} | ${cell.station} | \`${cell.agent}\` | ${cell.context} | ${[...reasons].map(([reason, n]) => `${reason} ×${n}`).join(", ")} |`;
  });

  return ["| Ticket | Station varied | Agent | Context | How the loops ended |", "|---|---|---|---|---|", ...rows].join("\n");
}

export function renderReport(input: { experimentId: string; loops: readonly LoopRecord[]; visits: readonly VisitRow[]; promptsLoreSha: string; subjectRepo: string; generatedAt: string; conclusions: string }): string {
  const cells = cellsOf(input.loops);

  return `# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of \`${input.experimentId}\` as of ${input.generatedAt}: ${input.loops.length} loops over ${cells.length} cells on ${input.subjectRepo}, prompts from lore \`${input.promptsLoreSha.slice(0, 8)}\`.

## Why we measured

The implementation loop's stations (\`dod\`, \`tdd-round\`, \`repair-build\`) each run on a model nobody chose by measurement. This bench replays merged tickets from their base commit with each harness and model, with and without the Lore MCP server, and repeats every cell so a lucky run shows as spread rather than as a rank.

## Results

Each row is one cell: one station varied against the production baseline, every other station at baseline. Values are the mean over the cell's runs, with min–max and standard deviation in parentheses.

${renderResultsTable(cells)}

What the columns mean:

- **Effort**: the reasoning effort the varied agent ran at. Where the experiment set none, the CLI's default applies, inferred because no CLI reports it: claude code's documented default (high, medium on Opus 5.5, Sonnet 5.5 and Haiku 5.5; Haiku 4.5 has no thinking), the level gemini-cli 0.62 sends (high for the Gemini 3 models, nothing for Gemini 4 Argon, which then runs at the API's medium), and codex's per-model default from its model list.
- **Reached green**: the loop ended with the subject's CI checks passing on the pushed branch.
- **Rounds**: tdd rounds the loop spent (12 is the budget).
- **Cost**: every model's token counts at its standard market price per million tokens, read 2026-10-19 (\`src/core/pricing.ts\`). No launch or promotional discounts: Gemini 4 Argon is priced at its December rate and gpt-5.6-sol at its pre-promotion rate, so the numbers hold for a long-term decision. Claude and Codex runs used subscriptions; their dollar figures are what the same tokens cost on the API.
- **Judge**: a fixed model's 1–5 scores against the issue and the merged pull request.
- **dod red→green**: the agent's acceptance tests failed on the base commit and passed once the merged pull request's production code was applied.
- **Files (Jaccard vs PR)**: files the branch touched, and the overlap of that set with the merged pull request's.

### How the loops ended

${renderEndReasons(cells)}

## What we read in it

${input.conclusions}

## What would improve it

_(written by hand from \`analyze\` and \`propose\`)_

## How it was run

- Prompts: the bodies of lore's \`libs/shared/src/agent-defaults/loop-*.md\` at \`${input.promptsLoreSha}\`, with \`/workspace\` pointed at a local directory per run.
- Each run: a bare \`origin\` with \`main\` at the ticket's base commit; the subject's CI commands run locally on the pushed head between rounds.
- Agents: bare \`claude\`, \`gemini\` and \`codex\` CLIs under a scratch HOME with only credentials copied in.

## Limits

- Local CI is one Node version on one machine, not GitHub's matrix.
- Codex has no Bash guard, so its rounds may run acceptance tests the others are refused.
- In the \`lore-mcp\` arm the Lore memory holds episodes from the real runs on these tickets.

`;
}
