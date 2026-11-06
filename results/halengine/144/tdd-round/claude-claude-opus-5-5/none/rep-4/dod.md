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

- [ ] Re-export `ListSessionsMessage`, `SessionSummaryFrame` and `SessionListMessage` from `src/index.ts`. (The three types are in `src/types/messages.ts` and in `IncomingMessage`/`OutgoingMessage`; only the re-exports remain.)
- [x] Validate `list_sessions` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`).
- [x] Wire `sessionStore` into `createMessageHandler` in `src/transport/createServer.ts`. (`createMessageHandler(orchestrator, sessionStore?)` already takes it; `createServer` still passes only the orchestrator, so the acceptance tests get no `session_list` yet.)
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` off the lock: `listFor(session.userId, {limit, before})`, answered as `session_list` with ISO dates through `sendSessionList` in `sender.ts`; a store without `listFor` answers `sessions: []`.
- [ ] When `listFor` throws or rejects, log `log.error('ws', ..., {userId, error})` and answer `ErrorCodes.SERVER_ERROR` (today it falls through to `wsErrorHandler`, which logs under `'message'` without the userId).
- [ ] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`. (§ 4.3 and § 5.9 exist; the error path and the GDPR statement remain.)
- [x] The `no-duplicate-code` pairs with `src/transport/sessionResume.test.ts` (`eventually`, the teardown `afterEach`, `delegatingTo`) are removed from that file's side: it now imports `eventually`, `stopAll` and `delegatingTo` from `wsTestSupport.ts`.
- [ ] Lint findings inside `src/transport/conversationList.acceptance.test.ts` itself — `prefer-early-return` at 67:7, and the `no-duplicate-code` pairs between its helpers (`eventually`, the teardown `afterEach`, `delegatingTo`) and `src/transport/sessionResume.test.ts` — can only be fixed by editing the acceptance test, which needs the ticket owner's decision (e.g. import those helpers from `wsTestSupport.ts`).

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.