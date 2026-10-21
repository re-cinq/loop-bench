Implemented and pushed `b1af958`.

- Added exported `TotalUsageMetadata`; `afterModelResponse` now names its `totalUsage` argument explicitly.
- Added focused hook-contract coverage and refactored duplicate test setup.
- Reanchored affected spec links, updated generated hook docs, changelog, and DoD checklist.
- Focused test passed via the repository test runner. No acceptance tests, lint, typecheck, or full suite were run locally.
- Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"acceptance green"}}