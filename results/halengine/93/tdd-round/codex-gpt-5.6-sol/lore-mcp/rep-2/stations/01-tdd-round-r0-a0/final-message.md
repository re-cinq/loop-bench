Implemented and pushed one TDD round:

- Added explicit public `TotalUsageMetadata` contract.
- Aggregated token usage across provider rounds.
- Added one focused test; confirmed red, then green.
- Updated spec traceability and `.lore/dod.md`.
- Branch is synchronized with `origin/main` and upstream.
- Red tests: 1 ours, 0 regressions.
- Next facet: missing-usage rounds and all-undefined behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}