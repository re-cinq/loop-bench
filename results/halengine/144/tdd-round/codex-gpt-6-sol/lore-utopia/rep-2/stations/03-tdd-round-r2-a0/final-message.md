Committed and pushed `ac578b7`. The server now passes its session store to the WebSocket handler, and a failed `listFor` logs on `ws` and returns `SERVER_ERROR`. I also repaired all eight lint findings from the previous CI brief.

The one test written this round went red, then green after the change. I did not run acceptance tests; CI will judge the push. Red tests at handoff: **0 written this round, 0 regressions**. The next checklist facet is protocol documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Wire the session store and handle listFor errors","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}