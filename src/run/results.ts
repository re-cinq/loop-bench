// Where results land: one results.jsonl per experiment and one folder per loop cell.
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { LoopRecordSchema, RecordSchema, type BenchRecord, type LoopRecord, type StationRunRecord } from "../core/records.js";

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

/** A run never writes over a cell folder: what an earlier run left there (cut short, restored or forced again) moves to artifacts/replaced, so its paid-for transcripts stay and the new run starts clean. */
export function archiveReplacedCell(dirs: { resultsDir: string; artifactsDir: string }, cell: string, at: Date): string | null {
  const cellDir = join(dirs.resultsDir, cell);

  if (!existsSync(cellDir)) {
    return null;
  }

  if (readdirSync(cellDir).length === 0) {
    rmSync(cellDir, { recursive: true });
    return null;
  }

  const target = join(dirs.artifactsDir, "replaced", cell, stampOf(at));

  mkdirSync(dirname(target), { recursive: true });
  renameSync(cellDir, target);
  return target;
}

function stampOf(at: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${at.getFullYear()}${pad(at.getMonth() + 1)}${pad(at.getDate())}-${pad(at.getHours())}${pad(at.getMinutes())}${pad(at.getSeconds())}`;
}

export function readLoopJson(cellDir: string): LoopRecord | null {
  const path = join(cellDir, "loop.json");

  return existsSync(path) ? LoopRecordSchema.parse(JSON.parse(readFileSync(path, "utf8"))) : null;
}

/** The newest record per station run: a visit is appended again once CI has judged its push. */
export function latestStationRuns(records: readonly BenchRecord[]): StationRunRecord[] {
  const byId = new Map<string, StationRunRecord>();

  for (const record of records) {
    if (record.kind === "station_run") {
      byId.set(record.run_id, record);
    }
  }

  return [...byId.values()];
}
