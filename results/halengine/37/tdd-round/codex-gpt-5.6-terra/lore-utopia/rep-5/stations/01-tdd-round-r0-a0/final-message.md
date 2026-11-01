Implemented and pushed `f68b1b9`.

- Added Ajv validation for missing required fields before executor invocation.
- Added focused registry unit test; it passes.
- Added Ajv dependency, configured validation options, and bumped version to `0.4.0`.
- Updated spec traceability and checked the dependency/version facet.
- Red tests: 1 mine; regressions: 0. CI had no retrievable branch verdict yet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add Ajv dependency and reject missing required tool input before executor invocation","tdd_next":"Compile static schemas at registration time and cache validators"}}