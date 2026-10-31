Implemented and pushed `d049c2c`.

- Added JSON Pointer escaping for required property names.
- Fixed registry-test lint violations and added a spec-linked red/green test.
- Ran only `src/orchestration/tools/registry.test.ts`; green (3 tests).
- CI’s 2 prior red tests were branch-added tests (ours); regressions: 0. This round’s deliberate red test: 1.
- Next facet: remaining registry/orchestrator unit tests and documentation updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Escape JSON Pointer-reserved characters in required-property rejection paths and consolidate the registry unit-test assertions to satisfy the test lint rules.","tdd_next":"Add the remaining registry/orchestrator unit tests and documentation updates"}}