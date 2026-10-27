Implemented and pushed commit `1015ef7`.

- Added Ajv dependency and schema compilation/cache support.
- Added traceable registry test for missing required input.
- Validation returns a rejection without invoking the executor.
- Ran only `src/orchestration/tools/registry.test.ts`; passed.
- Merged `origin/main`; branch is synchronized.
- CI status unavailable (Lore returned 404).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"compile and cache ToolRegistry input schema validators","tdd_next":"complete rejection validation behavior and remaining acceptance tests"}}