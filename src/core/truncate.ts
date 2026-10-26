// Cutting a finished loop at the point where a loop that varies one station would have ended.
import type { Station } from "./harness-names.js";
import type { LoopRecord, StationRunRecord } from "./records.js";
import { cutBeforeOtherStations, initialState, nextStep, type EndReason, type LoopState } from "./routing.js";
import { enforce } from "./enforce.js";

export type ReplayedVisit = Pick<StationRunRecord, "station" | "outcome"> & { ci: Pick<NonNullable<StationRunRecord["ci"]>, "green" | "head_sha"> | null };

export interface Kept {
  kept: number;
  state: LoopState;
  /** Null when the visits end before the routing reaches a decision: the loop's own end reason stands. */
  reason: EndReason | null;
}

/** Replays the routing over a loop's recorded visits and stops where a loop varying `variedStation` would have: the same state machine a new run uses. */
export function keptThroughVariedStation(visits: readonly ReplayedVisit[], variedStation: Station): Kept {
  let state = initialState(variedStation);

  for (const [index, visit] of visits.entries()) {
    enforce(visit.station === state.station, `visit ${index + 1} is ${visit.station}, but the routing expected ${state.station}`);
    let moved = nextStep(state, { kind: "agent", station: visit.station, outcome: visit.outcome });

    if (moved.step.kind === "ci") {
      enforce(visit.ci !== null, `visit ${index + 1} (${visit.station}) was followed by CI but recorded no verdict`);
      moved = nextStep(moved.state, { kind: "ci", green: visit.ci.green, headSha: visit.ci.head_sha });
    }
    state = moved.state;
    const step = cutBeforeOtherStations(moved.step, variedStation);

    if (step.kind === "done") {
      return { kept: index + 1, state, reason: step.reason };
    }
  }

  return { kept: visits.length, state, reason: null };
}

/** What cutting a finished loop would change, or null when the loop varies no station or already ends where the cut would. */
export function planCut(loop: Pick<LoopRecord, "mode" | "varied_station" | "end_reason">, visits: readonly ReplayedVisit[]): (Omit<Kept, "reason"> & { reason: LoopRecord["end_reason"] }) | null {
  if (loop.mode !== "ofat" || loop.varied_station === null) {
    return null;
  }
  const cut = keptThroughVariedStation(visits, loop.varied_station);
  const reason = cut.reason ?? loop.end_reason;
  const unchanged = cut.kept === visits.length && reason === loop.end_reason;

  return unchanged ? null : { ...cut, reason };
}
