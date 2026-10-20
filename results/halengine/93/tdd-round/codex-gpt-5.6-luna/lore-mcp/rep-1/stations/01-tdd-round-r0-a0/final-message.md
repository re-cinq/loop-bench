Implemented and pushed commit `781a15a`.

- Aggregates usage across provider rounds with explicit `AggregatedUsageMetadata`.
- Preserves `undefined` when no usage is reported.
- Added focused unit test and traceability link.
- Updated DoD facets.
- Test passed: `usageAggregation.test.ts`.
- One test was mine; no regressions.
- Base merge was already up to date; branch is synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate provider usage across rounds","tdd_next":"preserve the no-tool regression guard and update CHANGELOG/spec wording"}}