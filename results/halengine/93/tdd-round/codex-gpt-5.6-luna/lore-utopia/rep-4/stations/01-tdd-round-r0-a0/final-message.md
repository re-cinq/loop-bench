Implemented and pushed commit `d3a0eac`.

- Aggregates usage across provider rounds with public `TotalUsageMetadata`.
- Preserves `undefined` when no rounds report usage.
- Added focused regression test; 25 tests passed.
- 1 red test was ours; 0 regressions.
- Base branch merged; working tree is synchronized with upstream.
- Remaining facet: update hooks spec and CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate usage across provider rounds","tdd_next":"update hooks spec and CHANGELOG"}}