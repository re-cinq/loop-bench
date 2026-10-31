Fixed CI’s Ajv resolution issue and lint’s two-expect violation. Added static-schema registration coverage and traceability, ticked the compilation/caching facet, committed and pushed `e30a4f8`.

Focused test passed: `src/orchestration/tools/registry.test.ts`. Regressions: 0; new-test failures: 0 locally (the pre-existing implementation already satisfied the new assertion).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static ToolDefinition.inputSchema at registration time and cache dynamic validators","tdd_next":"Add remaining unit tests, documentation, and changelog updates"}}