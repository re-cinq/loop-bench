# Definition of Done

> afterModelResponse is called once per user message after the round loop exits, and is passed the lastUsage local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — The `afterModelResponse` hook is an existing public seam. I will write acceptance tests that provide a scripted provider with multiple rounds of known usage and verify that the hook receives the correct aggregated total and per-round breakdown.

## Done when these pass

- [ ] **reports aggregated usage for tool-heavy turns** — A turn with multiple tool rounds reports the sum of tokens across all rounds and the individual round breakdown.
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **reports correctly when some rounds have no usage** — If some rounds report no usage, they are ignored in the sum, and the total is still correctly calculated from the other rounds.
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **reports single round usage identically to today** — A turn with no tool calls reports the same usage fields as today, and the per-round breakdown contains that single round.
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **existing usage tests stay green** — The existing test that pins the "last usage" behavior (which will be updated to sum) must pass with the new behavior.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Define `AggregatedUsage` in `src/orchestration/chatOrchestrator.ts` extending `UsageMetadata`.
- [ ] Update `OrchestratorHooks.afterModelResponse` signature to use `AggregatedUsage`.
- [ ] Refactor `chatOrchestrator.ts` to accumulate usage across rounds.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md`.

## Out of scope

- Token accounting for anything other than provider calls.
- Audit or billing implementation itself.