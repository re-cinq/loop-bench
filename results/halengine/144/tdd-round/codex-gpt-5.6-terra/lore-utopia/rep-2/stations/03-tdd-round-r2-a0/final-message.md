Implemented and pushed `7b43b1e` (`feat(ws): dispatch session list frames`).

- Wired `sessionStore` into the WebSocket handler and server.
- Added authenticated session-list dispatch, ISO serialization, error logging/response, and validator type narrowing.
- Added focused handler coverage; `messageHandler.test.ts` passes (55 tests).
- Red tests: 1 intentional; 1 transient self-caused spy-leak regression, fixed; 0 pre-existing regressions.
- Acceptance tests were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and handle list_sessions frames","tdd_next":"Document list_sessions and session_list in the protocol and conversation-list specs"}}