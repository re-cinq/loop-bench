Committed and pushed `2c9b16f`. The new usage test failed before the aggregation helper was added and passed afterward. I also repaired all four findings from the previous CI verdict. The branch is up to date with `main` and its upstream.

Red tests this round: **1 new test, 0 regressions**. I ran only the new test file; CI will judge the acceptance tests. The next facet is preserving the unchanged no-tool usage guard.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do.","tdd_next":"Preserve the unchanged no-tool regression guard."}}