Completed and pushed commit `d857bc5`.

- Added `TotalUsageMetadata` and aggregate per-call token accounting.
- Added one focused red→green test.
- Updated spec traceability and ticked the completed DoD facet.
- Focused test passed; acceptance tests were not run.
- Red tests: 1 newly written, 0 regressions.
- Branch is current with `origin/main` and fully pushed.
- Next facet: missing-usage rounds and all-undefined behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}