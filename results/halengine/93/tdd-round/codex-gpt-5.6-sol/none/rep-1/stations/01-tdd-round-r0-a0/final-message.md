Implemented, committed, and pushed commit `d3dcea3`.

- Added a red test proving tool-request and answer-round usage must be summed.
- Added exported `TurnUsageMetadata` and accumulated usage across rounds.
- Updated spec traceability and checked off the completed DoD facet.
- Focused test passes.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}