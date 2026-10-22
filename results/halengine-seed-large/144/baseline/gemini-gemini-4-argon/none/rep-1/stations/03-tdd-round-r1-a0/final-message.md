Completed the TDD round for handling `list_sessions` over WebSocket:

- Threaded optional `sessionStore` into `createMessageHandler` in `src/transport/ws/messageHandler.ts` and wired `options.sessionStore` in `src/transport/createServer.ts`.
- Added `sendSessionList` in `src/transport/ws/sender.ts` and `handleListSessions` in `src/transport/ws/messageHandler.ts` (answering `{type: 'session_list', sessions}` with ISO-8601 `createdAt`/`updatedAt` for `session.userId`, `sessions: []` when `listFor` is absent, and `ErrorCodes.SERVER_ERROR` with a `'ws'` error log when `listFor` throws), covered by a new unit test in `src/transport/ws/messageHandler.test.ts`.
- Resolved all CI `eslint` findings from the previous push in `src/transport/ws/validation.test.ts` and `src/transport/conversationList.acceptance.test.ts` (2 red acceptance tests were from this ticket's unimplemented handler; 0 test regressions).
- Documented `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler, handle list_sessions in src/transport/ws/messageHandler.ts, document list_sessions and session_list in specs, and fix CI eslint findings","tdd_next":"acceptance green"}}