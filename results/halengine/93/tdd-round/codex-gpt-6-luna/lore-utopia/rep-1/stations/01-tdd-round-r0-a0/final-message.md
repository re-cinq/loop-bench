Closed the facet for summing usage across reported provider rounds. The new test failed against the old behavior, then passed after the orchestrator began accumulating each token field; the existing no-tool test remains unchanged. Updated the spec link and checked off the facet in `.lore/dod.md`.

The round’s test passed. Commit `cd8cdfa` was pushed, and the branch is up to date with `origin/main` and its upstream. No acceptance tests were run. Red tests: 1 written by this round, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field across provider rounds that report usage","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}