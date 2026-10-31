Implemented and pushed `92a159d` (`feat(ws): deliver session lists`).

- Added store-backed `list_sessions` dispatch with ISO date serialization and ws error handling.
- Wired `sessionStore` through `createServer`.
- Fixed the prior validation type error and CI trace/changelog issues.
- Test run: `src/transport/ws/messageHandler.test.ts` — 55 passing.
- Red tests: 1 authored during this round; 0 regressions observed.
- Next facet: document the frames in both protocol specs.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into the WebSocket message handler and deliver list_sessions responses","tdd_next":"Document list_sessions and session_list in the protocol specs"}}