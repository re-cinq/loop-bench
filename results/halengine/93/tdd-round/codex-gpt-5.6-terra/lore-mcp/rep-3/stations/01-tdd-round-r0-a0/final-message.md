Implemented and pushed `8b59151`.

- Added aggregate usage contract and summed provider-round usage.
- Added focused TDD test; red then green.
- Acceptance tests were not run.
- Red tests: 1 authored, 0 regressions.
- Next facet: handle missing usage rounds explicitly.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}