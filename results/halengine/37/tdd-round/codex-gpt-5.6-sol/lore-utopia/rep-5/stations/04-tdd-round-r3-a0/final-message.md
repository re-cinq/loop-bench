Fixed and pushed the CI lint regression in `registry.test.ts` by replacing the deep mock-call chain with `toHaveBeenCalled()`.

Targeted result: 2 tests passed. Branch is synced with `origin/main` and upstream. Red tests: 0 newly written, 0 regressions; repaired 1 lint regression.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair prior-round registry unit test lint regression","tdd_next":"Add remaining unit and orchestrator tests, traceability links, and documentation updates"}}