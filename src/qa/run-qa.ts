// Runs the context-qa matrix: each question asked of each arm three times, every ask by a fresh claude in an empty run dir under a scratch HOME, then judged by another fresh claude.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { enforce } from "../core/enforce.js";
import { finalText } from "../core/result-line.js";
import { loreStdioServer } from "../harness/mcp.js";
import type { McpStdioServer } from "../harness/harness.js";
import { runProcess } from "../io/spawn.js";
import { ancestorInstructionFiles } from "../run/isolation.js";
import { qaAnswerPrompt, qaClaudeCommand, qaHomeFiles, type Arm, type McpHttpServer } from "./arms.js";
import type { Bank, Question } from "./bank.js";
import { buildQaJudgePrompt, grade, parseJudgement, type Graded } from "./qa-judge.js";
import type { QaRecord } from "./qa-report.js";
import { readTranscript, type QaTranscript } from "./transcript.js";

export interface QaSettings {
  runsDir: string;
  resultsDir: string;
  userHome: string;
  answerModel: string;
  answerEffort: string;
  judgeModel: string;
  replicates: number;
  /** The replicate whose answers are judged twice, to measure the judge. */
  judgedTwiceRep: number;
  timeoutMs: number;
  lore: { dir: string; apiUrl: string; token: string } | null;
  utopia: { baseUrl: string; pat: string } | null;
}

export interface QaAsk {
  bank: Bank;
  question: Question;
  arm: Arm;
  rep: number;
}

/** Every ask, replicate by replicate, the arms taking turns within a question, so a run cut short still holds whole replicates of every arm. */
export function plannedAsks(banks: readonly Bank[], arms: readonly Arm[], replicates: number): QaAsk[] {
  const onePass = (rep: number): QaAsk[] => banks.flatMap((bank) => bank.questions.flatMap((question) => arms.map((arm) => ({ bank, question, arm, rep }))));

  return Array.from({ length: replicates }, (_, index) => onePass(index + 1)).flat();
}

export function askPath(ask: QaAsk): string {
  return join(ask.bank.repo.replace("/", "__"), ask.question.id, ask.arm, `rep-${ask.rep}`);
}

/** The utopia arm reads the repository's base through Utopia's own MCP route, with every write tool hidden from a read token and blocked besides. */
export function utopiaServer(baseUrl: string, pat: string, kbId: string): McpHttpServer {
  return { name: "utopia", url: `${baseUrl}/api/v1/kbs/${kbId}/mcp`, headers: { Authorization: `Bearer ${pat}` }, blockedTools: ["remember"] };
}

/** Lore's adapter with CONTEXT_PATH on the empty run dir: pointed at a checkout it would read that checkout's files and graph. */
export function qaLoreServer(lore: NonNullable<QaSettings["lore"]>, runDir: string): McpStdioServer {
  const server = loreStdioServer(lore.dir, lore.apiUrl, lore.token);

  return { ...server, env: { ...server.env, CONTEXT_PATH: runDir, LORE_AGENT_ID: "context-qa-bench" } };
}

function serverFor(ask: QaAsk, settings: QaSettings, runDir: string): McpStdioServer | McpHttpServer | null {
  if (ask.arm === "none") {
    return null;
  }
  if (ask.arm === "lore") {
    enforce(settings.lore, "the lore arm needs LORE_DIR, LORE_API_URL and LORE_INGEST_TOKEN");

    return qaLoreServer(settings.lore, runDir);
  }
  enforce(settings.utopia, "the utopia arm needs UTOPIA_BASE_URL and UTOPIA_PAT");
  enforce(ask.bank.utopia_kb_id, `${ask.bank.repo}'s bank has no utopia_kb_id`);

  return utopiaServer(settings.utopia.baseUrl, settings.utopia.pat, ask.bank.utopia_kb_id);
}

/** A fresh HOME holding only the onboarding flags, an empty settings file and a copy of the claude credentials. */
function freshHome(homeDir: string, userHome: string): void {
  rmSync(homeDir, { recursive: true, force: true });
  for (const file of qaHomeFiles(homeDir)) {
    mkdirSync(dirname(file.path), { recursive: true });
    writeFileSync(file.path, file.content);
  }
  cpSync(join(userHome, ".claude", ".credentials.json"), join(homeDir, ".claude", ".credentials.json"));
}

/** An empty git repository whose origin names the subject, so Lore's adapter scopes to it, with no file an agent could read. */
function emptyRunDir(runDir: string, repo: string): void {
  rmSync(runDir, { recursive: true, force: true });
  mkdirSync(runDir, { recursive: true });
  execFileSync("git", ["init", "-q"], { cwd: runDir });
  execFileSync("git", ["remote", "add", "origin", `https://github.com/${repo}.git`], { cwd: runDir });
  const leaks = ancestorInstructionFiles(runDir);

  enforce(leaks.length === 0, `instruction files above the run dir would reach the agent: ${leaks.join(", ")}`);
}

async function freshClaude(dir: string, settings: QaSettings, prompt: string, model: string, effort: string, mcp: McpStdioServer | McpHttpServer | null, repo: string, outPrefix: string): Promise<{ stdout: string; transcript: QaTranscript }> {
  const homeDir = join(dir, "home");
  const runDir = join(dir, "run");

  freshHome(homeDir, settings.userHome);
  emptyRunDir(runDir, repo);
  const command = qaClaudeCommand({ model, effort, prompt, runDir, homeDir, mcp });
  const result = await runProcess({ ...command, timeoutMs: settings.timeoutMs, stdoutPath: `${outPrefix}.stdout.jsonl`, stderrPath: `${outPrefix}.stderr.log` });

  return { stdout: result.stdout, transcript: readTranscript(result.stdout) };
}

async function judgeOnce(dir: string, settings: QaSettings, ask: QaAsk, answer: string | null, outPrefix: string): Promise<Graded> {
  const { transcript, stdout } = await freshClaude(dir, settings, buildQaJudgePrompt(ask.question, answer), settings.judgeModel, "medium", null, ask.bank.repo, outPrefix);
  const judgement = parseJudgement(finalText("claude", stdout));

  enforce(judgement, `the judge returned no verdict for ${askPath(ask)} (judge error: ${transcript.is_error})`);

  return grade(ask.question, judgement);
}

/** One ask, answered and judged; skipped when its result is already on disk. Returns the record. */
export async function runAsk(ask: QaAsk, settings: QaSettings): Promise<QaRecord> {
  const resultDir = join(settings.resultsDir, askPath(ask));
  const resultFile = join(resultDir, "result.json");

  if (existsSync(resultFile)) {
    return JSON.parse(readFileSync(resultFile, "utf8")) as QaRecord;
  }
  mkdirSync(resultDir, { recursive: true });
  const workDir = join(settings.runsDir, askPath(ask));
  const answerDir = join(workDir, "answer");
  const mcp = serverFor(ask, settings, join(answerDir, "run"));
  const { transcript } = await freshClaude(answerDir, settings, qaAnswerPrompt(ask.bank.repo, ask.question.question), settings.answerModel, settings.answerEffort, mcp, ask.bank.repo, join(resultDir, "answer"));
  const judgeRuns = ask.rep === settings.judgedTwiceRep ? 2 : 1;
  const judgements: Graded[] = [];

  for (let index = 1; index <= judgeRuns; index += 1) {
    judgements.push(await judgeOnce(join(workDir, `judge-${index}`), settings, ask, transcript.answer, join(resultDir, `judge-${index}`)));
  }
  const record: QaRecord = { repo: ask.bank.repo, question_id: ask.question.id, kind: ask.question.kind, arm: ask.arm, rep: ask.rep, transcript, judgements };

  writeFileSync(resultFile, `${JSON.stringify(record, null, 2)}\n`);
  rmSync(workDir, { recursive: true, force: true });

  return record;
}

export async function runAsks(asks: readonly QaAsk[], settings: QaSettings, parallel: number, log: (line: string) => void): Promise<void> {
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < asks.length) {
      const index = next++;
      const ask = asks[index]!;

      log(`[context-qa] ${index + 1}/${asks.length} ${askPath(ask)}`);
      const record = await runAsk(ask, settings).catch((error: unknown) => {
        log(`[context-qa] ${askPath(ask)} failed: ${error instanceof Error ? error.message : String(error)}`);

        return null;
      });

      if (record) {
        log(`[context-qa] ${askPath(ask)} ${record.judgements[0]?.verdict} ${record.transcript.duration_ms ?? "?"} ms, ${record.transcript.mcp_calls} MCP calls`);
      }
    }
  };

  await Promise.all(Array.from({ length: Math.max(1, parallel) }, worker));
}
