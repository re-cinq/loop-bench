Closed the facet for summing reported token fields across provider rounds. The focused test failed before the change and passed after it. Commit `76c62a8` was pushed; the branch is up to date with `origin/main` and its upstream.

The remaining facets are the explicit public usage contract, preserving the no-tool regression guard, and updating the hooks spec and changelog. Red tests this round: 1 authored, 0 regressions. No unrelated smells found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}