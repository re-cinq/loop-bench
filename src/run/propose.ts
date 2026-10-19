// Hands the worst runs' transcripts and the station prompt to a fixed model and keeps its suggested prompt edits as a file a human reads.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ExperimentConfig } from "../config/experiment.js";
import type { Station } from "../core/harness-names.js";
import { finalText } from "../core/result-line.js";
import { ADAPTERS } from "../harness/adapters.js";
import { buildScratchHome } from "../harness/scratch-home.js";
import { runProcess } from "../io/spawn.js";
import type { BenchPaths } from "./paths.js";

export interface ProposalEvidence {
  cellPath: string;
  analysis: string;
  finalMessage: string;
}

export function buildProposalPrompt(station: Station, promptBody: string, evidence: readonly ProposalEvidence[]): string {
  return `You are improving the prompt of an autonomous coding agent's "${station}" step. Below is the prompt as shipped, then evidence from runs that went badly or cost the most: a per-run analysis (tool calls, guard refusals, reinstalls, repeated reads, tokens) and the agent's final message.

Propose at most six concrete edits to the prompt that would make these runs succeed more often or cost less. For each edit give:
1. the exact passage to change (quote it) or where to insert,
2. the replacement text,
3. the runs and observations that motivate it,
4. the expected effect on success and on cost.

Prefer deletions and shortenings where the evidence shows text the agent ignores or that costs tokens without changing behaviour. Do not propose edits that drop a rule the evidence shows the agent needs. Write markdown.

## The prompt

\`\`\`markdown
${promptBody}
\`\`\`

## Evidence

${evidence.map((item) => `### ${item.cellPath}\n\n\`\`\`json\n${item.analysis}\n\`\`\`\n\nFinal message:\n\n> ${item.finalMessage.slice(-2000).replaceAll("\n", "\n> ")}\n`).join("\n")}`;
}

export async function propose(input: { config: ExperimentConfig; paths: BenchPaths; station: Station; evidence: readonly ProposalEvidence[] }): Promise<string> {
  const body = readFileSync(join(input.paths.promptsDir, input.station, "baseline.md"), "utf8");
  const prompt = buildProposalPrompt(input.station, body, input.evidence);
  const judge = input.config.judge;
  const homeDir = join(input.paths.runsDir, `propose-home-${Date.now()}`);
  const workspaceDir = join(homeDir, "empty");

  mkdirSync(workspaceDir, { recursive: true });
  const spec = { model: judge.model, prompt, workspaceDir, homeDir, mcp: null, extraEnv: {}, gemini: input.config.gemini ?? null, userHome: process.env["HOME"] ?? "" };
  const adapter = ADAPTERS[judge.harness];

  buildScratchHome({ spec, adapter, promptsDir: input.paths.promptsDir, skills: [] });
  const result = await runProcess({ ...adapter.command(spec), timeoutMs: 20 * 60_000 });
  const outDir = join(input.paths.root, "proposals");
  const outPath = join(outDir, `${new Date().toISOString().slice(0, 10)}-${input.station}.md`);

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(outPath, `# Prompt proposals for ${input.station} (${judge.harness}/${judge.model})\n\nEvidence: ${input.evidence.map((item) => `\`${item.cellPath}\``).join(", ")}\n\n${finalText(judge.harness, result.stdout)}\n`);

  return outPath;
}
