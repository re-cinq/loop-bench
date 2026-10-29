Completed one red-green-refactor round and pushed commit `9da182f`. The new test first failed because the hook received only the final provider call’s usage; it passes after the hook began summing usage across calls. I ran only that test. The branch is current with `main` and its upstream.

Red tests observed: 1 mine, 0 regressions. Next facet: verify rounds with missing usage and turns with no reported usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}