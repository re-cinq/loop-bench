Implemented and pushed `86863dd`.

- Added total usage aggregation across provider rounds with explicit `TotalUsageMetadata`.
- Added and passed the focused regression test.
- Did not run acceptance tests, full suite, lint, or typecheck.
- Red tests: 1 mine; regressions: 0 observed.
- Next facet: missing-usage aggregation behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}