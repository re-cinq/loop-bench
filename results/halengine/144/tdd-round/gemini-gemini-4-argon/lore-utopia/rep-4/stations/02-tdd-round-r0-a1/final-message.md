Closed the facet threading `sessionStore` into `createMessageHandler` as an optional parameter and wiring `options.sessionStore` in `src/transport/createServer.ts`.

- Red tests written this round: 1 (now green in `src/transport/createServer.test.ts`), regressions: 0.
- Updated spec citations and repointed shifted line anchors across `specs/`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and wire it in src/transport/createServer.ts","tdd_next":"Handle list_sessions in src/transport/ws/messageHandler.ts by reading session.userId, calling await sessionStore?.listFor?.(session.userId, {limit, before}), serialising Date fields to ISO strings, and on error logging via log.error('ws', ...) and sending ErrorCodes.SERVER_ERROR"}}