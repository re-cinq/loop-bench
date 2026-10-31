Fixed the two CI-reported lint violations in the dynamic-schema registry test and pushed `5a8ae24`.

The targeted test passes via the repository runner. The direct Jest command was incompatible with this repo’s ESM setup, so no tests ran under that invocation. Red tests: 0 mine, 0 regressions identified. Branch is pushed and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair registry dynamic-schema unit test lint violations","tdd_next":"Add remaining unit/orchestrator tests and documentation updates"}}