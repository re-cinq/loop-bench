Implemented and pushed `4f4ced3`.

- Added named `TotalUsageMetadata` hook contract and aggregate usage across provider rounds.
- Added a focused regression test; red as expected, then green.
- Updated its architecture-spec trace link and checked the first DoD facet.
- Focused test file passed: 25 tests.
- Red tests: 1 mine, 0 regressions. Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving `undefined` when none do."}}