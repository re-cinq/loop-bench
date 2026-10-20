Implemented and pushed commit `6f03365`.

- Added aggregation across provider rounds, ignoring rounds without usage.
- Added and passed one focused Jest test.
- Updated spec traceability and checked the usage-summing DoD facet.
- Branch is synchronized with `origin/main` and fully pushed.
- Red tests observed: 1 newly written test, 0 regressions.
- Next facet: make the public hook type explicitly identify total usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}