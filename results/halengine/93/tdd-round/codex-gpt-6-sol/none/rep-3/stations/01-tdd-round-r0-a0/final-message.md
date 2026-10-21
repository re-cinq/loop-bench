Committed and pushed one round. The new test first failed on final-call-only usage, then passed after the hook began summing provider usage across rounds. The public hook type now names that value `TotalTurnUsage`.

I ran only the new test. Red tests: 1 mine, 0 regressions. Acceptance tests and CI checks were left to CI; the branch is up to date with `main` and its upstream. The next facet is missing-usage behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit.","tdd_next":"Sum each token field only for provider rounds that report usage, preserving undefined when none do."}}