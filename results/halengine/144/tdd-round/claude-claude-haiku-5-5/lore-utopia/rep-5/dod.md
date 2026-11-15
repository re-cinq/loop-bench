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

- [x] (partly done: types added in round 5; still to do: re-export from `src/index.ts`) Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`.
- [x] Validate a bare `list_sessions` frame in `src/transport/ws/validation.ts` (round 1: returns `{type: 'list_sessions'}`, `ListSessionsMessage` added to `IncomingMessage`).
- [x] Keep a well-formed `limit` and `before` on a `list_sessions` frame in `src/transport/ws/validation.ts` (round 2: pass-through, unit test in `validation.test.ts`).
- [x] Reject a malformed `list_sessions` `limit` in `src/transport/ws/validation.ts` with INVALID_MESSAGE (round 3: a non-negative integer `limit`, unit test in `validation.test.ts`).
- [x] Reject a malformed `list_sessions` `before` in `src/transport/ws/validation.ts` with INVALID_MESSAGE (optional `before` object with 1–128 char `sessionId` and `updatedAt` string that parses as a date; strip unknown fields like `userId`).
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`.
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` fields to ISO strings, and on error logging via `log.error('ws', ...)` and sending `ErrorCodes.SERVER_ERROR`.
- [ ] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.
- [x] Log a failed `listFor` under category `'ws'` with the user id and answer `SERVER_ERROR` in `src/transport/ws/messageHandler.ts` (CI verdict on 1469fc2: the failure went out under `'message'` without the user id).