Closed the `list_sessions` validation facet. Added frame validation for a bare request, paging fields, and unknown-field stripping; the focused test also checks malformed values. Updated the spec citation and DoD checklist.

The test I wrote failed before implementation and passed afterward. Red tests: **1 mine, 0 regressions**. I did not run acceptance tests. CI failures could not be fetched because Lore reported that branch `loop-bench/144` was not found. The commit was pushed, and the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage to src/types/messages.ts and re-export them from src/index.ts"}}