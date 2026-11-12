I have completed one red-green-refactor round for ticket #144:

- **Red/Green Phase**: Added unit tests in `src/transport/ws/messageHandler.test.ts` verifying that `list_sessions` is answered with `session_list` using `sessionStore.listFor` for the authenticated user, an empty list when `listFor` is omitted, and an error frame (`SERVER_ERROR`) with a `ws` error log when `listFor` throws.
- **Implementation**:
  - Threaded optional `sessionStore?: SessionStore` into `createMessageHandler` in `src/transport/ws/messageHandler.ts` and wired `options.sessionStore` in `src/transport/createServer.ts`.
  - Added `sendSessionList` in `src/transport/ws/sender.ts`.
  - Implemented `handleListSessions` in `src/transport/ws/messageHandler.ts`.
- **Validation & Traceability**:
  - Ran unit tests in `src/transport/ws/messageHandler.test.ts` (57/57 passed; 0 red tests, 0 regressions).
  - Added inline spec validation links in `specs/hal-engine-conversation-list/spec.md`.
  - Verified spec anchor integrity with `scripts/repoint-spec-anchors.mjs --check`, `scripts/check-spec-links.mjs`, `scripts/check-spec-status.mjs`, and `scripts/check-spec-anchor-names.mjs`.
  - Formatted all changed files with prettier.
  - Updated `.lore/dod.md` facets.
  - Committed and pushed to `origin/loop-bench/144`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Thread sessionStore into createMessageHandler and handle list_sessions in messageHandler.ts","tdd_next":"Document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md"}}