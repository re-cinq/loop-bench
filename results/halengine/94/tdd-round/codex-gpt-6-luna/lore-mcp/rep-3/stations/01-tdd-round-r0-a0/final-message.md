Moved `beforeSession` inside the orchestrator’s `try`, added a test for error propagation and both hooks, and updated the spec. The code and spec facets are ticked; the CHANGELOG facet remains for the next round.

The test I wrote failed before the fix and passed after. Red tests: 1 mine, 0 regressions. The commit was pushed, the branch is up to date with `origin/main`, and the worktree is clean. No unrelated smells were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside try and document its failure guarantee","tdd_next":"Document the change for existing consumers in CHANGELOG"}}