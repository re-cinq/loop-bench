Implemented and pushed `7d2a8f1`.

- Added wrong-type input rejection coverage and spec traceability.
- Fixed the two CI type errors by using Ajv’s native validator/error types.
- Focused registry test passed; acceptance tests, typecheck, lint, and full suite were not run locally.
- CI red tests: 0 mine, 0 regressions (the prior failure was two typecheck errors).
- Next facet: remaining registry/orchestrator tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add the registry unit test for wrong-typed input rejection, including the linked specification statement.","tdd_next":"Add the remaining registry and orchestrator unit tests, link the remaining statements, and update the required documentation."}}