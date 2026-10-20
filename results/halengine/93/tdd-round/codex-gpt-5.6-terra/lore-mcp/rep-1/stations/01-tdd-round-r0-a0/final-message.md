Implemented and pushed `63a47ef`.

- Added a focused red/green regression test for aggregate usage across tool rounds.
- Accumulate reported token fields into `totalUsage`; unreported rounds preserve prior totals.
- Marked the aggregation facet complete in `.lore/dod.md`.
- Ran only the new test; it passed. Red tests: 1 mine, regressions: 0.
- Merged with `origin/main`; branch is pushed and up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}