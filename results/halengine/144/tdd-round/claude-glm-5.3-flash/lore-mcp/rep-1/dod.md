# Definition of Done

> #143 gives a consumer `store.listFor(userId)` inside the server process. The client on the other end of the WebSocket has no way to ask for it, and the consumer who wants a conversation picker without standing up their own REST endpoint has to write one anyway.

**Strategy: `direct`** — `createServer` and the WebSocket upgrade/message pipeline already exist and accept frames over a real WebSocket connection, so acceptance tests can connect today, send `list_sessions` frames, and fail directly on the missing `session_list` and `list_sessions` validation/dispatch behaviour.

## Done when these pass

- [ ] **listing conversations over the WebSocket protocol › answers list_sessions for the authenticated user with ISO dates, forwarding limit and before while ignoring any client userId** — Sends `{type: 'list_sessions', limit, before, userId}` over a connected WebSocket and verifies `store.listFor` is called with the socket's authenticated `userId` (`session.userId`) and `{limit, before}`, answering `{type: 'session_list', sessions}` with `createdAt` and `updatedAt` serialised as ISO-8601 strings.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol › answers an empty session_list when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws** — Verifies that a store without `listFor` answers `{type: 'session_list', sessions: []}` and a store whose `listFor` throws/rejects logs an error under category `'ws'` with the userId and error message and answers `{type: 'error', code: 'SERVER_ERROR'}`.
  `src/transport/conversationList.acceptance.test.ts`

- [ ] **listing conversations over the WebSocket protocol › accepts a bare list_sessions frame and rejects a malformed limit or before with INVALID_MESSAGE without calling listFor** — Verifies that `{type: 'list_sessions'}` is accepted while non-integer or negative `limit` values and malformed `before` cursors (`sessionId` outside 1–128 chars or unparseable `updatedAt`) are rejected with `INVALID_MESSAGE` without invoking `store.listFor`.
  `src/transport/conversationList.acceptance.test.ts`

## Facets

- [x] Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`.
- [x] Validate `list_sessions` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`).
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`.
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` fields to ISO strings, and on error logging via `log.error('ws', ...)` and sending `ErrorCodes.SERVER_ERROR`.
- [x] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
- [x] Make the branch's build green: fix the eslint findings CI named (unused `HAL_WS_SUBPROTOCOL` import in the acceptance file, `camelcase` on the validator's snake_case dispatch table, `max-member-chain` on `stopEngines`'s `hal.wss.clients.size`, the duplicated store/socket block in messageHandler.test.ts, `test-imports-its-subject` in messages.test.ts) and add the missing spec citations for the two messageHandler conversation-list tests. The red `test` check's output was truncated in the round brief; every branch-authored unit suite was verified green here (messageHandler, validation, messages: 63; sessionResume: 25), and the acceptance file — unrunnable in this pod by rule — traces green against the implementation, so its verdict is CI's to give on this push.
- [x] Clear the three eslint findings CI named on ea32d37: reverting the validator to the `switch` re-tripped `re-lint/prefer-polymorphism` (3-way dispatch), so the dispatch is now a `Map` lookup table whose keys are string literals — no switch for `prefer-polymorphism`, no snake_case property names for `camelcase`; the fixture test at messages.test.ts:7 gains its citation on the protocol spec's additive-type-surface statement (§ 3); and the session row is read through a destructured first row instead of the three-hop `answer.sessions[0].createdAt` chain.
- [ ] Name and fix the red `test` check on ea32d37: the round brief's jest window truncates before any failing suite is named, the Lore gateway holds no log for this branch, the run's own coverage artifact in the CI checkout passes every committed floor, and the acceptance file traces green against the handler (bare `/hal/ws` passes the path prefix, `ws.userId` reaches `listFor`, answers precede the pong). Its verdict is CI's to name on this push.

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.