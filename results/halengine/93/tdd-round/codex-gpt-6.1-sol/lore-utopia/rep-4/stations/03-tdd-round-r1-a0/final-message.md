Committed and pushed `c2027c1`; branch is current with `main` and upstream.

One red-green-refactor round completed: orchestrator usage now accumulates across provider calls. The new contract test failed as expected, then passed after implementation and refactoring. Fixed the missing spec citation and updated the changelog.

Red tests: 1 newly written; 0 identified regressions. Acceptance tests remain CI’s responsibility. No unrelated smells addressed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Install accumulateUsage in the orchestrator round loop","tdd_next":"Expose explicit public total-usage contract"}}