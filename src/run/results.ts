// Where results land: one results.jsonl per experiment and one folder per loop cell.
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { LoopRecordSchema, RecordSchema, type BenchRecord, type LoopRecord } from "../core/records.js";

export function appendRecord(resultsDir: string, experimentId: string, record: BenchRecord): void {
  const path = join(resultsDir, experimentId, "results.jsonl");

  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(RecordSchema.parse(record))}\n`);
}

export function readRecords(resultsDir: string, experimentId: string): BenchRecord[] {
  const path = join(resultsDir, experimentId, "results.jsonl");

  if (!existsSync(path)) {
    return [];
  }

  return readFileSync(path, "utf8")
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => RecordSchema.parse(JSON.parse(line)));
}

/** The newest loop record per loop id: a rescored loop appends a second record, and the last one is the truth. */
export function latestLoops(records: readonly BenchRecord[]): LoopRecord[] {
  const byId = new Map<string, LoopRecord>();

  for (const record of records) {
    if (record.kind === "loop") {
      byId.set(record.loop_id, record);
    }
  }

  return [...byId.values()];
}

export function writeLoopJson(cellDir: string, record: LoopRecord): void {
  mkdirSync(cellDir, { recursive: true });
  writeFileSync(join(cellDir, "loop.json"), JSON.stringify(LoopRecordSchema.parse(record), null, 2));
}

export function readLoopJson(cellDir: string): LoopRecord | null {
  const path = join(cellDir, "loop.json");

  return existsSync(path) ? LoopRecordSchema.parse(JSON.parse(readFileSync(path, "utf8"))) : null;
}
