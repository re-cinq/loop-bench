Implemented and pushed the `list_sessions` validation facet in commit `ae7031b`. The one test written this round failed before the change and passed after the refactor. No regressions were observed; Lore could not retrieve CI results because it reported the branch was not found. The branch is up to date with its upstream.

`list_sessions` validation is complete; the next round should add the message types and wire them into `IncomingMessage` and `OutgoingMessage`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Add ListSessionsMessage, SessionSummaryFrame, and SessionListMessage types and wire them into the message unions"}}
