Implemented and pushed `4422986` (`fix(orchestrator): aggregate turn usage`).

- Added public `TotalUsageMetadata` and aggregate provider-call usage in `afterModelResponse`.
- Added and passed one focused regression test.
- Red tests: 1 mine; regressions: 0.
- Did not run acceptance tests, full suite, lint, build, or typecheck.
- Next facet: missing-usage aggregation behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}