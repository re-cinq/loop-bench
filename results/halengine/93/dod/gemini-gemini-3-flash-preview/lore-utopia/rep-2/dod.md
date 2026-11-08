# Definition of Done

> `afterModelResponse` hook now receives an aggregated usage object that sums token counts across every provider call in a turn, instead of just the last round.

**Strategy: `direct`** — The `afterModelResponse` hook is already a seam in `createChatOrchestrator`. The acceptance tests will call the orchestrator with a scripted provider and verify the hook receives the expected aggregated usage.

## Done when these pass

- [ ] **reports cumulative usage across tool rounds** — A turn with two tool rounds sums usage from all three provider calls (initial + 2 tool rounds).
  `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **reports single round usage for direct answers** — A turn with no tools reports exactly one round's usage, maintaining backwards compatibility with `UsageMetadata`.
  `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **ignores rounds with missing usage in the sum** — Rounds without usage metadata do not affect the sum or cause it to be undefined/NaN.
  `src/orchestration/usage-reporting.acceptance.test.ts`
- [ ] **reports nothing if no rounds reported usage** — If no provider call returns usage, the hook receives `undefined`.
  `src/orchestration/usage-reporting.acceptance.test.ts`

## Facets

- [ ] Define `AggregatedUsage` type in `src/types/ai.ts` that extends `UsageMetadata` and adds a `rounds` array.
- [ ] Update `OrchestratorHooks['afterModelResponse']` signature to use `AggregatedUsage`.
- [ ] Update `ChatOrchestrator` to accumulate usage in a list and sum it before calling the hook.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` (already drafted, verify final state).

## Out of scope

- Token accounting for non-provider call overhead.
- Changes to the `stop` chunk itself (providers continue to populate it as they do today).