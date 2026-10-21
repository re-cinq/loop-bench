Implemented and pushed commit `e592dd4`. The focused registry test went red first, then passed after validation was added. One red test was mine; no regressions were reported. The trace tool wasn’t available in this pod, and CI hasn’t reported a verdict yet.

The next round should cover schema compilation errors and caching, including tests. The branch is up to date with `origin/main` and its upstream. No unrelated issues were acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"AJV dependency/version bump and ToolRegistry input validation","tdd_next":"schema compilation errors and validator caching tests"}}