// Copies the implementation loop's agent prompts, skills and hook bundles out of a lore checkout, verbatim, and records the sha they came from.
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { enforce } from "../src/core/enforce.js";

const STATION_SOURCES = {
  dod: "loop-dod.md",
  "tdd-round": "loop-tdd-round.md",
  "repair-build": "loop-fix-ci.md",
} as const;

const SKILLS = ["lore-context", "tdd-loop", "legacy-characterize"];

function main(argv: readonly string[]): void {
  const loreDir = argv[0];
  enforce(loreDir !== undefined, "usage: sync-prompts <lore checkout dir>");
  const promptsDir = join(import.meta.dirname, "..", "prompts");
  const sha = execFileSync("git", ["-C", loreDir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();

  for (const [station, file] of Object.entries(STATION_SOURCES)) {
    mkdirSync(join(promptsDir, station), { recursive: true });
    const body = readFileSync(join(loreDir, "libs/shared/src/agent-defaults", file), "utf8");
    writeFileSync(join(promptsDir, station, "baseline.md"), body);
  }
  const bundle = join(loreDir, "apps/mcp-server/agent-skills");

  for (const skill of SKILLS) {
    cpSync(join(bundle, "skills", skill), join(promptsDir, "skills", skill), { recursive: true });
  }
  cpSync(join(bundle, "hooks"), join(promptsDir, "hooks"), { recursive: true });
  writeFileSync(join(promptsDir, "LORE_SHA"), `${sha}\n`);
  process.stdout.write(`[loop-bench] prompts synced from lore ${sha}\n`);
}

main(process.argv.slice(2));
