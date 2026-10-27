// Which finished loops still need a judge score, and how to split them between workers.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { LoopRecordSchema, type LoopRecord } from "../core/records.js";

export interface Shard {
  index: number;
  count: number;
}

export function parseShard(text: string | undefined): Shard {
  if (text === undefined) {
    return { index: 0, count: 1 };
  }
  const match = /^(\d+)\/(\d+)$/.exec(text);
  const [index, count] = [Number(match?.[1]), Number(match?.[2])];

  const isShard = match !== null && index >= 0 && index < count;

  if (!isShard) {
    throw new Error(`--shard takes i/n with 0 <= i < n, got "${text}"`);
  }

  return { index, count };
}

export const needsJudge = (record: LoopRecord): boolean => record.judge === null;

/** A loop that ran a dod station: every whole loop, and an ofat loop only when dod is the station it varies. */
export const ranDod = (record: LoopRecord): boolean => record.mode !== "ofat" || record.varied_station === "dod";

export const needsDod = (record: LoopRecord): boolean => ranDod(record) && record.dod_check === null;

/** Every finished loop under an experiment's results folder, found on disk: a loop run from a config this checkout never held (a colleague's GLM runs) is still there. */
export function finishedLoopsOnDisk(resultsDir: string, experimentId: string): Array<{ cellDir: string; record: LoopRecord }> {
  const root = join(resultsDir, experimentId);

  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name === "loop.json")
    .map((entry) => ({ cellDir: entry.parentPath, record: LoopRecordSchema.parse(JSON.parse(readFileSync(join(entry.parentPath, entry.name), "utf8"))) }))
    .sort((a, b) => a.record.loop_id.localeCompare(b.record.loop_id));
}

/** The loops this worker scores: those without a judge score whose position in the sorted list is its shard's. */
export function toJudge(loops: ReadonlyArray<{ cellDir: string; record: LoopRecord }>, shard: Shard): Array<{ cellDir: string; record: LoopRecord }> {
  return inShard(loops.filter(({ record }) => needsJudge(record)), shard);
}

/** The loops this worker gives a dod check: those that ran a dod station and have none, dealt out like toJudge. */
export function toDodCheck(loops: ReadonlyArray<{ cellDir: string; record: LoopRecord }>, shard: Shard): Array<{ cellDir: string; record: LoopRecord }> {
  return inShard(loops.filter(({ record }) => needsDod(record)), shard);
}

const inShard = <T>(items: readonly T[], shard: Shard): T[] => items.filter((_, position) => position % shard.count === shard.index);
