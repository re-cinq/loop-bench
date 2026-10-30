Completed and pushed commit `5a98825`.

- Added turn-wide `TurnUsageMetadata` contract.
- Aggregated all token fields across provider calls.
- Added one focused test; red then green.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}