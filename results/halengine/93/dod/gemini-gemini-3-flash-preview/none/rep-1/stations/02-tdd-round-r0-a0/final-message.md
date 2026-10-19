Branch is up to date. The round delivered:

- **`accumulateUsage(acc, round)`** added to `orchestratorHelpers.ts` — sums both fields when both are defined, returns whichever is defined when one is undefined, returns undefined when both are
- **Unit tests** for all four cases added to `orchestratorHelpers.test.ts` (8 tests pass)
- **`chatOrchestrator.ts`** updated: `lastUsage = outcome.usage ?? lastUsage` → `lastUsage = accumulateUsage(lastUsage, outcome.usage)`
- **CHANGELOG** entry added with migration note
- **DoD facets** ticked: summing, undefined handling, CHANGELOG, spec (spec was already updated)

Unrelated smell noticed but not touched: the `chatOrchestrator.test.ts` test "keeps the usage an earlier round reported when a later round reports none" tests the old `??` behavior — it will still pass because `accumulateUsage(u1, undefined) === u1`, which is the same result.

Remaining open facet: rename `usage` parameter to `totalUsage` in the `afterModelResponse` hook signature (cosmetic type clarity, no behavior change needed for CI green).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum UsageMetadata across rounds + handle undefined rounds + CHANGELOG update","tdd_next":"Update afterModelResponse hook signature parameter name to totalUsage for type clarity"}}