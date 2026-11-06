Branch is clean and pushed. The round is complete.

**Summary:**
- **Facet closed**: "Replace final-round retention with a deliberately named total-usage contract" + "Sum each token field only for provider rounds that report usage" + CHANGELOG/spec update — these three are tightly coupled, all closed in one round.
- **Test written**: `accumulateUsage` unit test in `orchestratorHelpers.test.ts` — sums two defined usage records.
- **Implementation**: Added `accumulateUsage` to `orchestratorHelpers.ts`; replaced `lastUsage = outcome.usage ?? lastUsage` with `totalUsage = accumulateUsage(totalUsage, outcome.usage)` in `chatOrchestrator.ts`.
- **29 tests pass** (5 helpers + 24 orchestrator), bar stayed green throughout.
- **0 regressions, 0 unrelated smells fixed.**

**Future improvements noted (not acted on):**
- `orchestratorHelpers.ts` is a name-by-role bucket rather than a domain-named module — the functions could be better distributed (e.g., `usageAccumulator.ts`), but that's a rename/move outside this ticket's scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all tool rounds via accumulateUsage, rename lastUsage to totalUsage, update CHANGELOG","tdd_next":"acceptance green"}}