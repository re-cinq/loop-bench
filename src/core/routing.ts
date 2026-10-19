// The implementation loop's routing as a pure state machine, mirroring lore's floor-pipelines/implementation-loop.yaml for the stations this bench replays. open-pr, ready-for-review, mark-ready and await-pr are skipped: a local CI run stands in for await-ci.
import type { Outcome } from "./result-line.js";
import type { Station } from "./harness-names.js";

export const ROUND_BUDGET = 12;
export const REPAIR_BUDGET = 2;
export const RETRY_BUDGET = 1;

export interface LoopState {
  station: Station;
  attempts: Record<Station, number>;
  rounds: number;
  repairs: number;
  lastRedSha: string | null;
}

export type StationEvent =
  | { kind: "agent"; station: Station; outcome: Outcome }
  | { kind: "ci"; green: boolean; headSha: string };

export type EndReason = "green" | "dod_scoped_out" | "round_budget" | "repair_budget" | "retry_budget";

export type Step = { kind: "run"; station: Station } | { kind: "ci" } | { kind: "done"; reason: EndReason };

export function initialState(station: Station): LoopState {
  return { station, attempts: { dod: 0, "tdd-round": 0, "repair-build": 0 }, rounds: 0, repairs: 0, lastRedSha: null };
}

export function nextStep(state: LoopState, event: StationEvent): { state: LoopState; step: Step } {
  return event.kind === "agent" ? afterAgent(state, event.station, event.outcome) : afterCi(state, event.green, event.headSha);
}

function afterAgent(state: LoopState, station: Station, outcome: Outcome): { state: LoopState; step: Step } {
  const attempts = { ...state.attempts, [station]: state.attempts[station] + 1 };
  const next = { ...state, attempts };

  if (outcome === "failed") {
    return state.attempts[station] < RETRY_BUDGET
      ? { state: next, step: { kind: "run", station } }
      : { state: next, step: { kind: "done", reason: "retry_budget" } };
  }
  if (station === "dod") {
    return outcome === "success" ? run(next, "tdd-round") : { state: next, step: { kind: "done", reason: "dod_scoped_out" } };
  }

  return { state: next, step: { kind: "ci" } };
}

function afterCi(state: LoopState, green: boolean, headSha: string): { state: LoopState; step: Step } {
  if (green) {
    return { state, step: { kind: "done", reason: "green" } };
  }
  const red = { ...state, lastRedSha: headSha };

  if (state.lastRedSha === headSha) {
    return state.repairs < REPAIR_BUDGET
      ? run({ ...red, repairs: state.repairs + 1 }, "repair-build")
      : { state: red, step: { kind: "done", reason: "repair_budget" } };
  }

  return state.rounds < ROUND_BUDGET
    ? run({ ...red, rounds: state.rounds + 1 }, "tdd-round")
    : { state: red, step: { kind: "done", reason: "round_budget" } };
}

function run(state: LoopState, station: Station): { state: LoopState; step: Step } {
  return { state: { ...state, station, attempts: { ...state.attempts, [station]: 0 } }, step: { kind: "run", station } };
}
