Implemented and pushed `8a20287`.

- Added `AggregatedUsageMetadata` and aggregate field-wise usage across provider rounds.
- Added a focused red/green tool-loop test; it passes.
- Updated traceability and ticked the aggregate-contract facet.
- CI regressions reported: 0. Red tests written this round: 1.

Next facet: handle/pin missing-usage rounds and all-undefined behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}