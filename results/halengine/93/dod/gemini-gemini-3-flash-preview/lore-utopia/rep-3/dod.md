# Definition of Done

> `afterModelResponse` is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — I will write a new acceptance test file that uses a scripted provider to simulate multiple tool rounds with known token counts. The tests will verify that `afterModelResponse` receives the accumulated usage across all rounds, and that the type of the usage argument is unambiguous.

## Done when these pass

- [x] **reports usage across multiple tool rounds** — A turn with two tool rounds (three provider calls) reports the sum of tokens from all three calls.
  `src/orchestration/usage-reporting.acceptance.test.ts`
- [x] **reports exact usage for turns without tools** — A turn with zero tool rounds reports exactly the usage of the single provider call, maintaining parity for the common case.
  `src/orchestration/usage-reporting.acceptance.test.ts`
- [x] **handles missing usage on some rounds** — A turn where one round reports usage and another reports none (undefined) still correctly sums the available usage.
  `src/orchestration/usage-reporting.acceptance.test.ts`
- [x] **unambiguous usage type** — The `afterModelResponse` hook receives a type that clearly identifies it as a summary (e.g., `TurnUsage` with `total` and `rounds`).
  `src/orchestration/usage-reporting.acceptance.test.ts`

## Facets

- [x] Define `TurnUsage` type in `src/types/ai.ts` (or `src/orchestration/chatOrchestrator.ts`).
- [x] Update `OrchestratorHooks['afterModelResponse']` signature.
- [x] Accumulate usage in `chatOrchestrator.ts` loop.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new behavior.
- [x] Update CHANGELOG.md.

## Out of scope

- Token accounting for non-provider calls.
- Audit entry or billing record implementation.
- `stop` chunk usage shape changes.