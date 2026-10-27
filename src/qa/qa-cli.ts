// The context-qa command line: `run` asks the banks' questions of the arms, `report` writes REPORT.md from the results on disk.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { DEFAULT_RUNS_DIR } from "../run/paths.js";
import { ArmSchema } from "./arms.js";
import { loadBank } from "./bank.js";
import { renderQaReport, type QaRecord } from "./qa-report.js";
import { plannedAsks, runAsks, type QaSettings } from "./run-qa.js";

const ROOT = resolve(import.meta.dirname, "..", "..");
const USAGE = `usage: npm run qa -- <run|report> [options]
  run     --bank <file,...> [--arms none,lore,utopia] [--reps 3] [--parallel 3] [--only <id,...>] [--results <dir>]
  report  [--results <dir>]
env for run: LORE_DIR, LORE_API_URL, LORE_INGEST_TOKEN (lore arm); UTOPIA_BASE_URL, UTOPIA_PAT (utopia arm)`;

function settingsFromEnv(resultsDir: string, replicates: number): QaSettings {
  const env = process.env;
  const loreDir = env["LORE_DIR"];
  const loreApiUrl = env["LORE_API_URL"];
  const loreToken = env["LORE_INGEST_TOKEN"];
  const utopiaBaseUrl = env["UTOPIA_BASE_URL"];
  const utopiaPat = env["UTOPIA_PAT"];

  return {
    runsDir: join(env["LOOP_BENCH_RUNS"] ?? DEFAULT_RUNS_DIR, "context-qa"),
    resultsDir,
    userHome: homedir(),
    answerModel: env["QA_ANSWER_MODEL"] ?? "claude-sonnet-5-5",
    answerEffort: env["QA_ANSWER_EFFORT"] ?? "medium",
    judgeModel: env["QA_JUDGE_MODEL"] ?? "claude-opus-5-5",
    replicates,
    judgedTwiceRep: 1,
    timeoutMs: 10 * 60_000,
    lore: loreDir && loreApiUrl && loreToken ? { dir: loreDir, apiUrl: loreApiUrl, token: loreToken } : null,
    utopia: utopiaBaseUrl && utopiaPat ? { baseUrl: utopiaBaseUrl, pat: utopiaPat } : null,
  };
}

function readRecords(resultsDir: string): QaRecord[] {
  return readdirSync(resultsDir, { recursive: true, encoding: "utf8" })
    .filter((path) => path.endsWith("result.json"))
    .map((path) => JSON.parse(readFileSync(join(resultsDir, path), "utf8")) as QaRecord);
}

async function main(): Promise<void> {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      bank: { type: "string" },
      arms: { type: "string", default: "none,lore,utopia" },
      reps: { type: "string", default: "3" },
      parallel: { type: "string", default: "3" },
      only: { type: "string" },
      results: { type: "string", default: join(ROOT, "results", "context-qa", new Date().toISOString().slice(0, 10)) },
    },
  });
  const resultsDir = resolve(values.results);

  if (positionals[0] === "report") {
    const records = readRecords(resultsDir);

    writeFileSync(join(resultsDir, "REPORT.md"), renderQaReport({ title: "Context QA: Lore vs Utopia vs no MCP", generatedAt: new Date().toISOString(), records }));
    console.log(`[context-qa] wrote ${join(resultsDir, "REPORT.md")} from ${records.length} answers`);

    return;
  }
  if (positionals[0] !== "run" || !values.bank) {
    console.error(USAGE);
    process.exitCode = 1;

    return;
  }
  const only = values.only ? new Set(values.only.split(",")) : null;
  const banks = values.bank.split(",").map((path) => {
    const bank = loadBank(resolve(path));

    return only ? { ...bank, questions: bank.questions.filter((question) => only.has(question.id)) } : bank;
  });
  const replicates = Number(values.reps);
  const arms = values.arms.split(",").map((arm) => ArmSchema.parse(arm));
  const asks = plannedAsks(banks, arms, replicates);

  await runAsks(asks, settingsFromEnv(resultsDir, replicates), Number(values.parallel), (line) => console.log(line));
}

await main();
