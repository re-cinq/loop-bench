Implemented and pushed `f96a2a3`.

- Added `AggregateUsageMetadata` and aggregate per-round provider usage for `afterModelResponse`.
- Added a focused failing-then-passing tool-loop test and traceability link.
- Updated the first DoD facet.
- Ran only the new test; it passed. No CI regressions were reported; 1 red test was mine, 0 regressions.
- Merged `origin/main` check (already current) and confirmed the branch is pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}