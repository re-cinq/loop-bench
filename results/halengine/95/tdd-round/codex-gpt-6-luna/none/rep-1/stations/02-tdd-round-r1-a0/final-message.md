Committed and pushed `083f1bf`. The branch is up to date with `origin/main`, and the working tree is clean.

The focused undefined-rejection test passed. I did not run acceptance tests, lint, or the other existing Error-instance tests. This round had **0 red tests of mine and 0 regressions**. The DoD facet for the Unreleased changelog entry is checked; the existing Error-instance test facet remains open.

The pod lacked the `lore-query-trace` interface. I also could not complete a strict red-green-refactor cycle because the implementation was already present and the focused test passed after assertion cleanup.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add the Unreleased changelog entry and repair the reported CI findings","tdd_next":"Confirm existing Error-instance tests remain green"}}