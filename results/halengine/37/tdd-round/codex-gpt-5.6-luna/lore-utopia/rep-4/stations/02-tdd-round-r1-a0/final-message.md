Implemented and pushed one red-green-refactor round.

- Added safe wrong-type validation with expected type reporting.
- Fixed CI-reported TypeScript, lint, duplicate-test, and traceability issues.
- Focused test passed; no acceptance/full suite/typecheck/lint run.
- 1 red test was mine; 0 regressions observed.
- Commit: `0c28fbb`

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reject wrong-typed properties without leaking values","tdd_next":"static and dynamic schema compilation/caching"}}