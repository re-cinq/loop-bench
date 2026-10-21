Completed and pushed commit `e9128ed`.

- Added explicit public `TotalUsageMetadata` contract.
- Aggregated usage across provider rounds.
- Added one focused regression test and spec traceability.
- Test passed: 1; skipped: 24.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with upstream and `main`.
- Next facet: missing-usage rounds and all-undefined behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}