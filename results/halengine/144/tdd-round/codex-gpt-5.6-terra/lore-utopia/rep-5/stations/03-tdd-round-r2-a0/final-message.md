Delivered and pushed `1b499f0`.

- Added authenticated `list_sessions` dispatch, store wiring, ISO serialization, and WS error handling.
- Fixed the prior validator type-narrowing CI failure.
- Ran: `messageHandler.test.ts` — 55 passing.
- Red tests: 1 mine, 0 regressions.
- Next facet: protocol/spec documentation.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler/createServer and handle list_sessions","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}