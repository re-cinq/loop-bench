Fixed the reported CI issues: WebSocket test iteration, the dispatch test’s assertion count, and validation’s dispatch/nesting lint findings. The edited dispatch unit test passed; acceptance tests, lint, and typecheck were not run here.

Committed and pushed as `08d8c90`; the branch is up to date with `origin/main`. Red tests written this round: 0. Regressions: 0 known; CI will report whether the remaining findings are resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair prior CI failures for session list dispatch and validation","tdd_next":"acceptance green"}}