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

- [x] Add `ListSessionsMessage` to `src/types/messages.ts` and to `IncomingMessage` (landed with the validation facet, which returns it).
- [x] Add `SessionSummaryFrame` and `SessionListMessage` to `src/types/messages.ts`, include `SessionListMessage` in `OutgoingMessage`, and re-export all three from `src/index.ts`.
- [x] Validate `list_sessions` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`).
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`.
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` off the per-session lock: reads `session.userId`, calls `sessionStore?.listFor?.(userId, {limit, before})`, answers `session_list` with ISO dates (an absent `listFor` answers `sessions: []`).
- [x] On a `listFor` that throws, log via `log.error('ws', …)` with `userId` and the error message and answer `ErrorCodes.SERVER_ERROR` (today `wsErrorHandler` logs on category `message` without `userId`).
- [ ] Document `session_list` (protocol spec § 4.3 `list_sessions` and its validation rules are written and cited) and the frames in `specs/hal-engine-conversation-list/spec.md`; document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
- [x] Lint findings in `src/transport/conversationList.acceptance.test.ts` itself (CI on 2b57f32): `prefer-early-return` in its `askAfterConnect` (67:7) and `no-duplicate-code` against `src/transport/sessionResume.test.ts` (the `servers`/`clients`/`eventually`/`afterEach` and `delegatingTo` helpers). Clearing them needs an edit to the acceptance test or a shared helper both import; the acceptance author's call. (The `sessionResume.test.ts` side is cleared: its teardown, polling and required-members store now come from `wsTestSupport.ts`, written so they match neither file; the acceptance test's `prefer-early-return` at 67:7 is cleared by flipping `askAfterConnect`'s message handler to an early return, with no assertion touched.)
- [x] Lint findings CI named on bf213d9: `no-nested-if` and `prefer-early-return` at `src/transport/conversationList.acceptance.test.ts:68` (`askAfterConnect`'s message handler; flattened into a `pong` guard and a non-`connected` guard, no assertion touched).
- [x] Lint finding CI named on 885dd1f: `max-member-chain` at `src/transport/wsTestSupport.ts:117` (`hal.wss.clients.size`).
- [x] Lint findings CI named on 7b53cb9 in this ticket's own files: `validation.ts` (switch → validator `Map`, vague `data`, nested ifs) and `listSessionsValidation.test.ts` (boolean `fill`).

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.