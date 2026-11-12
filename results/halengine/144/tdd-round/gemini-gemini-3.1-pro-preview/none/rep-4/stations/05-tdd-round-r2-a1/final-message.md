The CI failures reported in the `round-brief.md` (typecheck, test, and prettier) were addressed in a previous commit on this branch (`cfc8d9f`), and both `npm run typecheck` and the test suite are now passing cleanly.

I completed the final facet by updating the WebSocket protocol specification to define the new `list_sessions` client-to-server message and the `session_list` server-to-client message. The `hal-engine-conversation-list` spec had already been updated in a previous commit with the necessary behavior citations.

The updates have been committed and pushed successfully, and the branch is in sync with its upstream base. The round ran no tests here because this was purely documentation following up on previously implemented behavior, but `check-spec-links` passes. 

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md.","tdd_next":"acceptance green"}}