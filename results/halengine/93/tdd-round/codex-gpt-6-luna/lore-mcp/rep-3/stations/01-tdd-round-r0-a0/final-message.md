Implemented and pushed commit `4e2e912` (`Aggregate orchestrator turn usage`). The hook now receives `TotalUsageMetadata`, and the new test verifies usage is summed across provider calls. The existing no-tool guard remains unchanged.

The new test passed after the refactor. I did not run acceptance tests, lint, typecheck, or the full suite. Lore returned 403 for coverage and CI lookups, so prior CI failures and regression counts could not be verified: **1 red test written this round; 0 regressions identified**. The branch is pushed and up to date with `origin/main`.

The next facet is to verify missing usage rounds are counted safely and an entirely unreported turn remains `undefined`. No unrelated issues found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"named aggregate usage contract","tdd_next":"verify reported rounds are summed across missing-usage gaps while all-missing usage remains undefined"}}