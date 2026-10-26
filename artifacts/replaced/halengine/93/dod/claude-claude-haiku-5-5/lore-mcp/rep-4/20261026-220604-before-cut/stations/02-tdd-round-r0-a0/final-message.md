Branch is pushed and up to date. Summary:

- **Closed facet**: Green — `chatOrchestrator.ts` now accumulates `outcome.usage` via `accumulateUsage()` instead of discarding prior rounds with `?? lastUsage`. Rounds that report no usage are skipped; a turn where nothing reported passes `undefined`.
- **New helper**: `accumulateUsage(acc, next)` in `orchestratorHelpers.ts` — pure function, tested with one unit test (red→green).
- **0 regressions**: all 24 existing `chatOrchestrator.test.ts` tests remain green.
- **Unrelated smells noticed (not fixed)**: `extractUsage` in `orchestratorHelpers.ts` returns `undefined` for non-stop chunks but `null` is never produced — no issue, just noting the asymmetry with `extractStopReason` which returns `null`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Green: accumulate usage across all provider calls in a turn","tdd_next":"Document on OrchestratorHooks.afterModelResponse that usage is the sum over every provider call"}}