Committed and pushed the WebSocket session-list handler round. The test written this round failed before the change and passed after the refactor. I also repaired the CI-reported lint and citation findings without changing the acceptance assertions.

I ran only the new test file. It has 0 red tests; the prior verdict identified 0 regressions. CI will judge the acceptance tests on this push. The branch is synced with `main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into the WebSocket handler and answer list_sessions","tdd_next":"Document list_sessions and session_list in the protocol specs"}}