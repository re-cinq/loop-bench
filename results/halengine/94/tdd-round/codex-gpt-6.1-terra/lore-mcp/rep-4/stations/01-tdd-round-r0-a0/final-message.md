Moved `beforeSession` into the orchestrator’s error-handling scope and updated the hook spec. The new focused test passed after failing as expected. CI’s previous verdict was unavailable: Lore reported the branch was not found. This round observed **1 red test of our own and 0 regressions**.

Committed and pushed `3a6c4d8`; the branch is up to date with `origin/main` and its upstream. The remaining facet is the consumer-facing CHANGELOG entry. The existing non-`Error` gate and tool-round usage accounting remain out of scope.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle beforeSession failures in lifecycle hooks and update the spec","tdd_next":"Document the consumer-facing change in the CHANGELOG"}}