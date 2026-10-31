Implemented and pushed `e573d8e`.

- Added focused red–green test for a throwing `beforeSession`.
- Moved `beforeSession` into the lifecycle `try`, so `onError` and `afterSession` run while the original error propagates.
- Updated traceability link and checked off the code facet.
- Focused test passed. Red tests: 1 mine; regressions: 0.
- Next facet: clarify the guarantee in the spec.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new guarantee for beforeSession"}}