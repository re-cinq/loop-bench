Pushed `f2517b6` with legacy Ajv `dataPath` normalized to JSON Pointer paths, plus a linked nested-enum regression test.

Ran only `src/orchestration/tools/registry.test.ts`: 7 passed. This round had 1 newly written red test; CI’s 2 prior red tests were ticket tests, with 0 regressions. No unrelated smells acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize legacy Ajv dotted dataPath values to JSON Pointer paths in validation rejections","tdd_next":"Add the remaining registry/orchestrator tests and documentation updates"}}