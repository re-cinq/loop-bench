Pinned dynamic-schema WeakMap caching with a unit test, fixed all prior CI type/lint/spec-link findings, formatted, committed, and pushed `7b9a0e6`.

Test run: `registry.test.ts` passed (4 tests). The new test was green immediately because the caching implementation already existed. Red tests: 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap)","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}