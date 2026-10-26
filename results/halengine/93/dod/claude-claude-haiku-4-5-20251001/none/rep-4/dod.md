# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The seam exists in `src/orchestration/chatOrchestrator.ts` where `lastUsage` is assigned on each round. The acceptance tests call the real orchestrator with a scripted multi-round provider and assert that the accumulated usage is passed to `afterModelResponse`, not just the final round's usage.

## Done when these pass

- [ ] **accumulates usage from multiple tool rounds into a sum** — A two-round tool turn with known, different usage per round reports the summed total
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports the single round usage when a turn has no tool calls** — A no-tool turn reports the same as today, unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **accumulates only from rounds that report usage, handling undefined in some rounds** — Rounds with undefined usage are skipped; only rounds with reported usage are summed
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **reports undefined when no rounds report usage** — A turn where no round reports usage results in undefined, not 0 or NaN
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Accumulate usage across all rounds in the loop, summing `inputTokens`, `outputTokens`, and `totalTokens` from each round that provides them
- [ ] Pass the accumulated sum to `afterModelResponse` instead of just `lastUsage`
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace line 28 with the new accumulated-usage behaviour
- [ ] Add a CHANGELOG entry under `### Changed` documenting that `afterModelResponse` now receives the summed usage across all rounds, a MINOR bump for deployers billing from the hook
- [ ] All acceptance tests pass; existing tests remain unedited and pass

## Out of scope

- The `per-round breakdown` variant (passing both sum and per-round details)
- Auditing or billing record implementation
- Changes to the `stop` chunk's own `usage` shape
- Any changes to other hooks or orchestrator behaviour