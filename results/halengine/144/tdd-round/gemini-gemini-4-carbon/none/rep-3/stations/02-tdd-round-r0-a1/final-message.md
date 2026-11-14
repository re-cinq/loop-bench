Completed one red-green-refactor round closing the `messageHandler` `list_sessions` facet (`fda523e`):
- Added unit test `src/transport/ws/listSessions.test.ts` (observed RED, then GREEN; 1 red test was ours during RED, 0 regressions).
- Added `sendSessionList` in `src/transport/ws/sender.ts` and handled `list_sessions` in `src/transport/ws/messageHandler.ts` with optional `sessionStore`, ISO-8601 date serialisation, per-socket non-turn ordering, and `ws`-category error logging with `ErrorCodes.SERVER_ERROR`.
- Linked spec citations in `specs/hal-engine-conversation-list/spec.md`, ticked the facet in `.lore/dod.md`, and pushed to `origin/loop-bench/144` (no unrelated smells acted on).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle list_sessions in src/transport/ws/messageHandler.ts and src/transport/ws/sender.ts","tdd_next":"Thread sessionStore into createMessageHandler in src/transport/createServer.ts"}}