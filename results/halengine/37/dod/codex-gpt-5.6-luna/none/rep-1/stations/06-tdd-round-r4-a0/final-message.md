Branch is pushed and up to date. The fix extracted the duplicated `weather` tool registration into a shared `makeWeatherRegistry` helper, eliminating the `re-lint/no-duplicate-code` ESLint error. All 4 tests still pass (0 regressions, 0 new red tests).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint no-duplicate-code in registry.test.ts","tdd_next":"acceptance green"}}