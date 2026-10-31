Implemented and pushed `217d778`.

- Added a regression test proving undeclared valid properties reach the executor unchanged.
- Added its spec traceability link.
- Fixed the CI typecheck failure by importing Ajv’s `ValidateFunction` type.
- Focused test passed; no acceptance tests, build, lint, or typecheck were run locally.
- Red tests: 1 mine during test setup, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"valid undeclared input properties pass through unchanged","tdd_next":"add the remaining registry and orchestrator validation tests plus documentation updates"}}