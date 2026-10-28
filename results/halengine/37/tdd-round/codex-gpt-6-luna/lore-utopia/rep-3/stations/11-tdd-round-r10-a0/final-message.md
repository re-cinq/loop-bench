Added the orchestrator retry test and corrected the four stale spec links reported by CI. The targeted test passed; **0 tests written this round were red, and 0 regressions were observed**. The implementation was already present, so the test passed on its first run.

Committed and pushed as `f83e643`; the branch is up to date with `origin/main` and its upstream. The documentation updates remain for the next facet. The prior CI test failure had no named failing test in the round brief, and I did not run acceptance tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add registry and orchestrator retry tests and link their validated statements","tdd_next":"Update example, tool docs, README, .specify/spec.md, ADR-002, and CHANGELOG"}}