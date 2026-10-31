Completed and pushed `254edcb`.

- Added a red/green unit test proving `minLength` is not enforced.
- Registry now validates only required/type/enum constraints.
- Updated spec traceability and DoD.
- Ran only `src/orchestration/tools/registry.test.ts`: green (4 tests).
- Red tests: 1 mine; regressions: 0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Limit schema enforcement to required properties, declared types, and enums","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}