Implemented and pushed `c3b55ae`.

- Added aggregated `TurnUsageMetadata` for `afterModelResponse`.
- Added a focused tool-turn regression test; it went red, then green.
- Updated traceability link and checked off the first DoD facet.
- Ran only `src/orchestration/chatOrchestratorUsage.test.ts`: passing.
- Red tests: 1 authored, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}