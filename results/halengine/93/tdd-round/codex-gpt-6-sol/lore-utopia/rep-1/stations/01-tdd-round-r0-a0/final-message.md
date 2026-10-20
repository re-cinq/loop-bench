Committed and pushed the usage aggregation round (`bd3a8ce`). The new test failed on the final call’s counts, then passed with all reported rounds summed, including a round with no usage. I updated the spec and changelog. The branch is clean and up to date with its upstream.

Red tests: 1 written this round; 0 known regressions. The next facet is making the hook’s public usage type explicitly describe a turn total.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}