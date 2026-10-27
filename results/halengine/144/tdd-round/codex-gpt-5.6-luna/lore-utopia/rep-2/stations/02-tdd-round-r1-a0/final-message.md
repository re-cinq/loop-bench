Implemented and pushed one TDD round:

- Threaded `sessionStore` through the WebSocket message handler and server.
- Added handler-level test with authenticated user and ISO serialization.
- Fixed prior CI lint, changelog, and spec-anchor issues.
- Test file passed: `src/transport/ws/messageHandler.test.ts`
- 1 authored red test, 0 regressions.
- Branch is pushed and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler","tdd_next":"Complete remaining list_sessions protocol and documentation facets"}}