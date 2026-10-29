Committed and pushed `e3690ec`. This round fixed the reported weather-test import and registry-test lint findings, and added a test for static schema compilation. The two changed test files pass (11 tests). CI will verify typecheck and lint.

Red tests this round: 1 from my change, fixed; regressions: 0. The remaining facet is the registry and orchestrator tests with spec links.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repair CI findings and pin static schema compilation across ten executions","tdd_next":"Add remaining registry and orchestrator unit tests with spec links"}}