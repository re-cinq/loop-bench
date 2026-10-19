Completed one red-green-refactor round for the usage accumulation facet. The new test failed on the last call’s usage, then passed after the orchestrator began summing provider-call usage with a pure helper. I formatted the changed files, committed `8843b7b`, and pushed; the branch is even with its upstream.

I ran only the new test. Acceptance tests and CI were not run here. Red tests in this round: **1 written here, 0 known regressions**. The Lore trace tool was unavailable. The next facet is making the hook signature identify its usage as a turn total.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate per-round usage into a running turn total","tdd_next":"Make the hook signature say usage is a turn total"}}