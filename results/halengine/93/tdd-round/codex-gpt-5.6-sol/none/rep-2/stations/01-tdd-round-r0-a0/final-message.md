Implemented and pushed commit `09a1f91`.

- Added field-wise usage aggregation across provider rounds.
- Preserved `undefined` until usage is reported.
- Added and passed one focused test.
- Updated traceability and checked the completed DoD facet.
- Red tests: 1 authored, 0 regressions.
- Branch is synchronized with its upstream and `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}