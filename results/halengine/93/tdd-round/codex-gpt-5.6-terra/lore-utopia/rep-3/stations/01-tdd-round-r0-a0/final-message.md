Implemented and pushed `66cb89e`.

- Added a focused regression test; it failed on final-round usage, then passed after aggregation.
- `afterModelResponse` now receives token totals across reported provider rounds.
- Updated the spec citation and ticked the aggregation facet.
- Ran only `src/orchestration/chatOrchestrator.test.ts` successfully: 25 passed.
- Red tests: 1 mine, 0 regressions. Lore CI/trace access was denied.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}