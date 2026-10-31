Implemented and pushed `0c1ea4e`.

- Added aggregate `TotalUsageMetadata` contract and summed provider-round usage.
- Added one focused regression test; it passes.
- Did not run acceptance tests, full suite, lint, or typecheck.
- Red tests: 1 written by this round; regressions: 0.
- Next facet: missing-usage aggregation semantics.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}