# Definition of Done

> afterModelResponse is called once per user message after the round loop exits, and is passed the lastUsage local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

**Strategy: `direct`** — A seam already exists at the `afterModelResponse` hook. The acceptance tests call the real orchestrator entry point and verify usage is accumulated across all tool rounds, not just the last one. The orchestrator's main loop at `chatOrchestrator.ts#L111` accumulates `responseText` and `lastUsage` across iterations; the fix changes how `lastUsage` is accumulated to sum the tokens rather than replace them.

## Done when these pass

- [ ] **accumulates usage from every tool round and passes the sum to afterModelResponse** — A turn driven through two tool rounds with known, different usage values on each round reports the sum of all rounds to the hook.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **preserves single-round usage when no tool round occurs** — A turn that answers directly with no tool calls reports the same usage as before, ensuring the common path does not move.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **accumulates usage when only some rounds report it** — When intermediate rounds report usage but later rounds do not, earlier usage is preserved and accumulated, not lost.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **reports undefined when no round reports usage** — A turn where no provider call reports usage should report undefined to the hook, not NaN or a zero object.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Implement usage accumulation in the round loop: sum token counts across rounds instead of replacing lastUsage
- [ ] Verify existing tests for single-round behavior remain green (no-tool turns should not change)
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the under-counting statement with the new aggregation behavior
- [ ] Add CHANGELOG entry documenting the behavior change for existing consumers of the hook

## Out of scope

- The shape of the hook's third parameter: the choice between passing a sum alone or sum + breakdown is an implementation decision left to the round
- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape