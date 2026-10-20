Implemented and pushed `af82be9`.

- Added a regression test for summed usage across a tool turn; it passes.
- Aggregates all reported provider-call token fields, preserving `undefined` until usage exists.
- Updated the spec traceability link and checked the matching DoD facet.
- Ran only `src/orchestration/chatOrchestrator.test.ts`; 25 passed.
- Red tests: 1 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}