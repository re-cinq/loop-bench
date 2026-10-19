Branch is up to date and cleanly pushed.

**Summary of the round:**

- **Facet closed**: Sum reported usage per message without mutating provider values, treating missing rounds as absent and resetting between turns.
- **What changed**: Added `accumulateUsage(acc, next)` pure function to `orchestratorHelpers.ts`; wired it into the loop in `chatOrchestrator.ts` replacing `lastUsage = outcome.usage ?? lastUsage`; added one failing-then-green test `'sums usage from every provider call in the turn'`.
- **Tests written vs regressions**: 1 test written by this round, 0 regressions (all 24 pre-existing tests still pass).
- **Future improvements noted (out of scope)**: none spotted.

**Next facet**: Make the public hook parameter type (`usage?: UsageMetadata` in `afterModelResponse`) explicitly represent turn-total usage so a reader doesn't need to open the orchestrator to know whether it is a sum — and update the spec + CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum reported usage per message without mutating provider values, treating missing rounds as absent and resetting between turns","tdd_next":"Make the public hook parameter type explicitly represent turn-total usage, without `any`; retain the single summed argument chosen in the spec rather than widening the API with a breakdown"}}