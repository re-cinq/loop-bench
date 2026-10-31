Implemented and pushed `4abe4aa`.

- Added type-validation rejection with property paths, expected constraints, and no input-value leakage.
- Added static validator compilation plus dynamic schema-object caching.
- Repaired reported type/lint/changelog issues and ticked the validation facet.
- Ran only `registry.test.ts`: passing after the red-green-refactor cycle.
- Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input before executor with safe type-rejection responses","tdd_next":"Compile static schemas at registration and verify dynamic-schema caching"}}