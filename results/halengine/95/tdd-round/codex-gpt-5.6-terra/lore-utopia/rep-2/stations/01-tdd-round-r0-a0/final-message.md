Implemented and pushed `66a4207`.

- Added one red/green unit test for a string rejection.
- `onError` now always receives an `Error`; non-Errors retain the original value as `cause`, while the caller receives the original rejection.
- Updated spec traceability and checked off the coercion facet.
- Targeted test passed. Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce a caught non-Error rejection to an Error so hooks.onError always fires","tdd_next":"Confirm existing Error-instance tests in src/orchestration/chatOrchestrator.test.ts remain green without modification"}}