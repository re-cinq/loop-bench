Completed one red-green-refactor round. A new test exposed that changing a static tool definition after registration changed validation; the registry now retains the validator compiled at registration. The test passed, and I fixed the prior CI lint finding.

Committed and pushed `3734c16`. The branch is up to date with `main` and its upstream. **Remaining red tests: 0 of mine, 0 regressions.** CI will judge the remaining acceptance bar.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reuse the compiled validator for a static tool after its definition changes","tdd_next":"Add remaining unit tests, spec links, and documentation updates"}}