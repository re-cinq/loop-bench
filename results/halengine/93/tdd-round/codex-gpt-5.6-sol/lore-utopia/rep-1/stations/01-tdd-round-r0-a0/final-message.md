Completed and pushed commit `c7b9540`.

- Added one failing aggregation test, then implemented optional per-field usage accumulation.
- Test file passes: 25/25.
- Updated spec traceability and `.lore/dod.md`.
- Red tests: 1 ours, 0 regressions.
- Branch is synchronized with upstream and `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}