import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ancestorInstructionFiles } from "./isolation.js";
import { DEFAULT_RUNS_DIR } from "./paths.js";

describe("ancestorInstructionFiles", () => {
  it("finds a .claude/CLAUDE.md two folders up", () => {
    const root = mkdtempSync(join(tmpdir(), "iso-"));
    mkdirSync(join(root, ".claude"));
    writeFileSync(join(root, ".claude", "CLAUDE.md"), "persona");
    mkdirSync(join(root, "a", "b"), { recursive: true });

    expect(ancestorInstructionFiles(join(root, "a", "b"))).toContain(join(root, ".claude", "CLAUDE.md"));
  });

  it("the default runs folder has none above it", () => {
    expect(ancestorInstructionFiles(DEFAULT_RUNS_DIR)).toEqual([]);
  });
});
