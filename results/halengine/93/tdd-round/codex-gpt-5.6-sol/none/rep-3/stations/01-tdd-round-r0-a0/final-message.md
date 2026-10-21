Implemented and pushed commit `4560474`.

- Added per-round usage accumulation, ignoring rounds without usage.
- Added and passed one focused Jest test.
- Updated spec traceability and `.lore/dod.md`.
- Red tests: 1 newly written; regressions: 0.
- Branch is synchronized with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}