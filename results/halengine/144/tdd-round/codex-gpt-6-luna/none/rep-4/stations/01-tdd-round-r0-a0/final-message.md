Implemented and pushed the `list_sessions` validation facet in commit `838c70b`. The new test failed before the implementation and passed afterward; it was the only test run. The branch is up to date with its upstream, and `origin/main` merged cleanly.

CI verdict was unavailable: there was no round brief, and no `lore_get_ci_failures` tool was available. I also could not query the coverage graph because `lore-query-trace` was unavailable. No unrelated findings were changed. Red tests: 1 written, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames and strip unknown fields","tdd_next":"Add SessionSummaryFrame and SessionListMessage; wire list_sessions dispatch"}}