Added and pushed `bda5dc3`.

- Added focused pass-through test for valid extra properties; it passes.
- Refactored existing registry tests to resolve all five CI lint findings.
- Updated spec links and DoD checklist.
- Did not run acceptance tests, lint, typecheck, or build.
- CI had 0 red tests and 0 regressions; it reported 5 lint errors, all fixed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add a unit test proving schema-valid input with undeclared extra properties reaches the executor unchanged and exactly once.","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}