Implemented and pushed `4420c3f`.

- Added a regression test for Ajv `dataPath` error paths.
- Validation messages now preserve `instancePath` or legacy `dataPath`, fixing nested path reporting and the type incompatibility.
- Re-anchored affected spec citations.
- Ran only `src/orchestration/tools/registry.test.ts`: passed (6 tests).
- Red tests: 1 mine; regressions: 0.
- Remaining facet: broader unit/orchestrator tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve Ajv validation property paths for schema rejections","tdd_next":"Add the remaining registry/orchestrator unit tests and documentation updates"}}