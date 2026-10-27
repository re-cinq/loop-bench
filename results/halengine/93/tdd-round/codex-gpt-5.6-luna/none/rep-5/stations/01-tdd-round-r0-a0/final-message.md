Implemented and pushed commit `bff6450`.

- Aggregates usage across provider rounds with explicit `AggregatedUsageMetadata`.
- Handles missing usage without `undefined`/`NaN`.
- Updated specs, changelog, checklist, and trace links.
- New test: red then green; final result 25/25 passed.
- No regressions observed; acceptance suite was not run per instructions.
- Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate usage contract and summation across reported provider rounds","tdd_next":"acceptance green"}}