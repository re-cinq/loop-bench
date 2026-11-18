import { effortLabel } from "./effort.js";
import { KNOWLEDGE_BASES, SIZE_KEYS, TASK_KEYS, compareKnowledgeBases, knowledgeEffectOf, moneySpentOf, repeatDisagreement, shakySizesOf, type KnowledgeComparison } from "./findings.js";
import type { KnowledgeBase, RunRow } from "./model-stats.js";
import { RECOMMENDED_WEIGHTS, ranked, reliableChoices, splitByCoverage, summarizeModels, type ModelSummary } from "./ranking.js";
import type { LoopRecord } from "./records.js";

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

/** A planned cell with no finished loop yet, shown so every model in the matrix is visible. */
export interface PendingCell {
  ticket: number;
  station: string;
  agent: string;
  effort: string;
  context: string;
  prompt: string;
  status: "running" | "not run yet";
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
  return a.ticket - b.ticket || a.station.localeCompare(b.station) || a.agent.localeCompare(b.agent) || a.context.localeCompare(b.context) || a.prompt.localeCompare(b.prompt);
}

export interface ReportInput {
  runs: readonly RunRow[];
  generatedAt: string;
  siteUrl: string | null;
}

const TASK_LABELS: Record<string, { title: string; activity: string }> = {
  dod: { title: "Write the tests", activity: "writing the tests" },
  "tdd-round": { title: "Write the code", activity: "writing the code" },
  "repair-build": { title: "Fix a broken build", activity: "fixing a broken build" },
};
const KNOWLEDGE_BASE_LABELS: Record<KnowledgeBase, string> = { none: "none", "lore-mcp": "Lore", "lore-utopia": "Utopia" };
const TOP_MODELS_SHOWN = 5;
const MISSING_SITE_URL = "<website address not set: pass --site-url or set LOOP_BENCH_SITE_URL>";

const percent = (share: number): string => `${Math.round(share * 100)}%`;
const plural = (count: number, word: string): string => `${count} ${word}${count === 1 ? "" : "s"}`;
const money = (value: number | null): string => {
  if (value === null) {
    return "unknown";
  }

  const digits = value >= 1000 ? 0 : 2;

  return value < 0.01 ? "under $0.01" : `$${value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
};
const minutesShort = (value: number | null): string => {
  if (value === null) {
    return "unknown";
  }

  return value < 1 ? "under 1 min" : `${Math.round(value)} min`;
};
const minutesLong = (value: number | null): string => {
  if (value === null) {
    return "an unknown time";
  }

  return value < 1 ? "under a minute" : plural(Math.round(value), "minute");
};
const worksIn = (row: ModelSummary): string => `${row.successes} of ${plural(row.runs, "run")} (${percent(row.successRate)})`;
const table = (headers: readonly string[], rows: readonly (readonly string[])[]): string =>
  [`| ${headers.join(" | ")} |`, `|${headers.map(() => "---").join("|")}|`, ...rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");

function introOf(runs: readonly RunRow[], generatedAt: string, siteUrl: string | null): string {
  const models = new Set(runs.map((run) => `${run.harness}/${run.model}`)).size;
  const tickets = new Set(runs.map((run) => run.ticket)).size;

  return [
    `As of ${generatedAt.slice(0, 10)}, we measured ${plural(runs.length, "run")} by ${plural(models, "AI model")} on ${plural(tickets, "ticket")}, each run being one model doing one job: writing the tests, writing the code, or fixing a broken build. A run works when the project's checks pass on what the model delivered.`,
    `Together the runs cost ${money(moneySpentOf(runs).total)} at list prices. The full results are on the website: ${siteUrl ?? MISSING_SITE_URL}`,
  ].join(" ");
}

const HOW_TO_READ = `Every ticket counts equally, however often it was run. Models are ranked on quality (70% how often the result works, 30% the AI reviewer score, which is not used for writing the tests), price and speed, with quality counting three times as much as each of the other two; price and speed are compared on a log scale. A model that skipped a ticket is not ranked. "Still works" means working at least three quarters as often as the most reliable model.`;

function recommendationOf(row: ModelSummary): string {
  const strength = row.strength === "few" ? ` Only ${plural(row.runs, "run")} so far, so treat it as a hint.` : "";

  return `Recommended: **${row.model}**. It works in ${worksIn(row)}, about ${money(row.costUsd?.median ?? null)} and ${minutesLong(row.minutes?.median ?? null)} a run.${strength}`;
}

function topTableOf(task: string, rows: readonly ModelSummary[]): string {
  const reviewed = task !== "dod";
  const headers = ["Model", "Works", "Usual cost", "Usual time", ...(reviewed ? ["AI reviewer score"] : []), "Cost per working result"];

  return table(headers, rows.map((row) => [
    row.model,
    worksIn(row),
    money(row.costUsd?.median ?? null),
    minutesShort(row.minutes?.median ?? null),
    ...(reviewed ? [row.review === null ? "none" : `${row.review.toFixed(1)} of 5`] : []),
    row.costPerSuccessUsd === null ? "never worked" : money(row.costPerSuccessUsd),
  ]));
}

function taskSectionOf(task: string, runs: readonly RunRow[]): string {
  const sizeOfTicket = Object.fromEntries(runs.map((run) => [run.ticket, run.size]));
  const summaries = summarizeModels(runs.filter((run) => run.task === task), { reviewed: task !== "dod" });
  const { fullyTested, notFullyTested } = splitByCoverage(summaries, sizeOfTicket);
  const top = ranked(fullyTested, RECOMMENDED_WEIGHTS).slice(0, TOP_MODELS_SHOWN);
  const { cheapest, fastest } = reliableChoices(fullyTested);
  const skipped = notFullyTested.map((row) => `${row.model} (${row.missingText})`);
  const lines = [
    top.length === 0 ? "No model has run every ticket for this job yet." : [recommendationOf(top[0]!), topTableOf(task, top)].join("\n\n"),
    cheapest && `Cheapest that still works: ${cheapest.model}, ${money(cheapest.costPerSuccessUsd)} per working result (works in ${percent(cheapest.successRate)} of runs).`,
    fastest && `Fastest that still works: ${fastest.model}, about ${minutesLong(fastest.minutesPerSuccess)} per working result (works in ${percent(fastest.successRate)} of runs).`,
    skipped.length > 0 && `Not ranked because they skipped a ticket: ${skipped.join(", ")}.`,
  ];

  return [`## ${TASK_LABELS[task]!.title}`, ...lines.filter(Boolean)].join("\n\n");
}

function knowledgeLineOf(comparison: KnowledgeComparison): string {
  const activity = TASK_LABELS[comparison.task]!.activity;

  if (comparison.setups === 0) {
    return `- For ${activity}, no setup ran with none, Lore and Utopia.`;
  }
  const [none, lore, utopia] = KNOWLEDGE_BASES.map((kb) => percent(comparison.byKnowledgeBase[kb].successRate));

  return `- For ${activity}, a knowledge base ${knowledgeEffectOf(comparison)}: runs work ${none} of the time with none, ${lore} with ${KNOWLEDGE_BASE_LABELS["lore-mcp"]} and ${utopia} with ${KNOWLEDGE_BASE_LABELS["lore-utopia"]}. That is over ${plural(comparison.setups, "setup")}, and Lore had a single run in ${comparison.loreSetupsWithOneRun} of them.`;
}

function knowledgeSectionOf(runs: readonly RunRow[]): string {
  const comparisons = TASK_KEYS.map((task) => compareKnowledgeBases(runs, task));
  const setups = comparisons.reduce((sum, comparison) => sum + comparison.setups, 0);
  const singleRuns = comparisons.reduce((sum, comparison) => sum + comparison.loreSetupsWithOneRun, 0);
  const caveat = singleRuns * 2 > setups ? " Most Lore setups have only one run, so these are hints, not proof." : "";

  return [
    "### Does a knowledge base help?",
    `A setup is one model on one ticket for one job. Only setups that ran with none, with Lore and with Utopia are compared, so the three are judged on the same work.${caveat}`,
    comparisons.map(knowledgeLineOf).join("\n"),
  ].join("\n\n");
}

function steadinessLineOf(runs: readonly RunRow[]): string {
  const { repeated, flipped } = repeatDisagreement(runs);

  if (repeated === 0) {
    return "No setup was run more than once, so we cannot say how much repeats disagree.";
  }

  return `Of ${plural(repeated, "setup")} run two or more times, ${flipped} (${percent(flipped / repeated)}) both worked and failed on different repeats, so one run is a weak guide.`;
}

function hardTicketsLineOf(runs: readonly RunRow[]): string {
  const shaky = shakySizesOf(runs).map((item) => `${TASK_LABELS[item.task]!.activity} on the ${item.size} ticket (best: ${percent(item.successRate)})`);

  return shaky.length > 0
    ? `No model works in three quarters of runs for ${new Intl.ListFormat("en", { type: "conjunction" }).format(shaky)}.`
    : "For every job and ticket size, at least one model works in three quarters of runs.";
}

function moneyLineOf(runs: readonly RunRow[]): string {
  const { total, wasted } = moneySpentOf(runs);

  return `${money(wasted)} of the ${money(total)} with a recorded cost (${percent(wasted / total)}) went to runs that did not work.`;
}

function limitsOf(runs: readonly RunRow[]): string {
  const sizeOfTicket = new Map(runs.map((run) => [run.ticket, run.size ?? "other"]));
  const sizeCounts = SIZE_KEYS.map((size) => [size, [...sizeOfTicket.values()].filter((ticketSize) => ticketSize === size).length] as const).filter(([, count]) => count > 0);
  const { runsWithoutCost } = moneySpentOf(runs);

  return [
    `- The results rest on ${plural(sizeOfTicket.size, "ticket")} of one project (${sizeCounts.map(([size, count]) => `${count} ${size}`).join(", ")}), so they may not carry over to other code.`,
    "- An AI, not a person, gives the reviewer score.",
    "- Time is the model's own working time as its tool reports it, without the wait for the project's checks.",
    `- ${plural(runsWithoutCost, "run")} of ${runs.length} have no recorded cost and are left out of the cost figures.`,
    "- Costs are list prices for the work done, not what a subscription charged.",
  ].join("\n");
}

export function renderReport({ runs, generatedAt, siteUrl }: ReportInput): string {
  if (runs.length === 0) {
    return "# Which AI model should do which job\n\nNo runs have finished yet.\n";
  }

  return [
    "# Which AI model should do which job",
    introOf(runs, generatedAt, siteUrl),
    HOW_TO_READ,
    ...TASK_KEYS.map((task) => taskSectionOf(task, runs)),
    "## What we learned",
    knowledgeSectionOf(runs),
    ["### How much repeats disagree", steadinessLineOf(runs)].join("\n\n"),
    ["### Which tickets are too hard", hardTicketsLineOf(runs)].join("\n\n"),
    ["### Where the money goes", moneyLineOf(runs)].join("\n\n"),
    "## Limits",
    limitsOf(runs),
  ].join("\n\n").concat("\n");
}
