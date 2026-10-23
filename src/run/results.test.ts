import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { archiveReplacedCell } from "./results.js";

const CELL = "halengine/93/dod/claude-claude-haiku-5-5/lore-mcp/rep-1";
const AT = new Date(2026, 9, 23, 22, 50, 7);

function benchDirs() {
  const root = mkdtempSync(join(tmpdir(), "results-test-"));

  return { resultsDir: join(root, "results"), artifactsDir: join(root, "artifacts") };
}

describe("archiveReplacedCell", () => {
  it("moves a cut-short cell's transcript to artifacts/replaced/<cell>/20261023-225007 and leaves no cell folder", () => {
    const dirs = benchDirs();
    mkdirSync(join(dirs.resultsDir, CELL, "stations", "01-dod-r0-a0"), { recursive: true });
    writeFileSync(join(dirs.resultsDir, CELL, "stations", "01-dod-r0-a0", "stdout.jsonl"), "paid for");

    const archived = archiveReplacedCell(dirs, CELL, AT);

    expect(archived).toBe(join(dirs.artifactsDir, "replaced", CELL, "20261023-225007"));
    expect(readFileSync(join(archived ?? "", "stations", "01-dod-r0-a0", "stdout.jsonl"), "utf8")).toBe("paid for");
    expect(existsSync(join(dirs.resultsDir, CELL))).toBe(false);
  });

  it("returns null and archives nothing when the cell folder is empty", () => {
    const dirs = benchDirs();
    mkdirSync(join(dirs.resultsDir, CELL), { recursive: true });

    expect(archiveReplacedCell(dirs, CELL, AT)).toBeNull();
    expect([existsSync(join(dirs.resultsDir, CELL)), existsSync(join(dirs.artifactsDir, "replaced"))]).toEqual([false, false]);
  });

  it("returns null when the cell has no folder yet", () => {
    expect(archiveReplacedCell(benchDirs(), CELL, AT)).toBeNull();
  });
});
