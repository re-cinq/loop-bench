Completed and pushed one TDD round.

- Added explicit exported `TotalUsageMetadata`.
- Aggregated usage across provider calls.
- Added one focused test: red first, then green.
- Updated spec traceability and facet checklist.
- Tests written red: 1. Regressions: 0.
- Branch is synchronized with `origin/loop-bench/93`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}