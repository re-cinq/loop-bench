Implemented and pushed commit `69c3213`.

- Added one RED→GREEN test for aggregation across rounds with missing usage.
- Added per-field usage accumulation while preserving absent totals.
- Updated spec traceability and checked the completed facet.
- Test result: 1 passed; 1 authored red, 0 regressions.
- Branch is synchronized with `origin/main` and upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}