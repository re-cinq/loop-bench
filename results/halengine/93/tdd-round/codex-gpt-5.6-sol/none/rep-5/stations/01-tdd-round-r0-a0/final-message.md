Completed and pushed one TDD round.

- Added explicit `AggregatedUsageMetadata` hook contract.
- Aggregated token usage across provider calls.
- Added and passed one focused test.
- Updated spec traceability and DoD facet.
- Red tests authored: 1; regressions: 0.
- Branch is synchronized with upstream and `origin/main`.

Next facet: missing-usage rounds and all-unreported turns.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}