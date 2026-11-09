Fixed the CI-reported missing spec link and pushed commit `843f691`. The branch is up to date with `origin/main` and its upstream.

One exploratory test passed, but it did not check the type contract because Jest transpiles away type imports; I discarded it. No tests were red in this round, and CI reported no test regressions. The public total-usage contract remains the next facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Link the missing-usage acceptance test to its spec statement","tdd_next":"Make the public total-usage contract explicit"}}