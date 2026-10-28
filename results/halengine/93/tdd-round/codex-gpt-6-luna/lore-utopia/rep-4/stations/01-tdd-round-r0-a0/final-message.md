Implemented and pushed commit `08e7209`. The new test failed first on final-round-only usage, then passed after summing reported round usage. The branch is clean and up to date with its upstream; `origin/main` was already merged.

One test was red by design; there were zero regressions. Lore returned 404 when asked for this branch’s CI verdict. No unrelated issues were acted on.

Next facet: give the aggregate usage contract a public type that makes summation explicit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit."}}