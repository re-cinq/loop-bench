Completed the TDD round for Ticket #144:

- Added a failing unit test in `src/transport/ws/messageHandler.test.ts` covering `list_sessions` dispatch, ISO-8601 date serialisation, missing `listFor` fallback to `[]`, and `SERVER_ERROR` handling on `listFor` rejection.
- Threaded `sessionStore` into `createMessageHandler` in `src/transport/ws/messageHandler.ts` and wired `options.sessionStore` in `src/transport/createServer.ts`, adding `sendSessionList` in `src/transport/ws/sender.ts`.
- Documented `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md`, `specs/hal-engine-conversation-list/spec.md`, and `CHANGELOG.md`, and resolved all `eslint`, `spec-names`, and `changelog` findings reported in `round-brief.md` (2 red acceptance tests from the ticket suite; 0 test regressions).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler, handle list_sessions in src/transport/ws/messageHandler.ts, and document list_sessions and session_list in specs and CHANGELOG.md","tdd_next":"acceptance green"}}