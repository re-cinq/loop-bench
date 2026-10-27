Committed and pushed `03eb386` (`feat(ws): validate list_sessions frames`). The branch is clean and synced with upstream; `origin/main` was already merged.

The new validator test failed as expected before the implementation and passed after it. Red tests: **1 (mine, expected)**; regressions: **0**. I ran no acceptance tests. CI lookup returned 404 for the branch.

I added the inline spec citation. The test-list script emits no `spec` field, so I couldn’t make it surface a spec anchor without changing that script.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Thread sessionStore into createMessageHandler and wire it in createServer"}}