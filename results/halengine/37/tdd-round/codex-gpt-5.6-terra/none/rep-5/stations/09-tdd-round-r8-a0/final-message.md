Implemented and pushed `64ee3b3`.

- Added a focused red/green test proving only required/type/enum constraints are enforced.
- Fixed AJV JSON-Schema import/type configuration and disabled format validation.
- Re-anchored affected spec links.
- Ran only `src/orchestration/tools/registry.test.ts`: green (8 tests).
- Red tests: 1 mine; regressions: 0.
- Next facet: remaining registry/orchestrator tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Restrict tool input validation to required, type, and enum constraints","tdd_next":"Add the remaining registry/orchestrator tests and documentation updates"}}