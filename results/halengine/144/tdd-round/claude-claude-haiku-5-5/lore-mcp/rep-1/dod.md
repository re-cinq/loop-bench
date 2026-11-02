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

- [ ] Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`.
- [x] Validate `list_sessions` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`).
  - [x] Bare `list_sessions` frame is accepted and a client `userId` is dropped (round 1, `validation.test.ts`).
  - [x] `limit` validation: integer 1–200 (per the ticket), else `INVALID_MESSAGE` (round 2, `validation.test.ts`). Open question: dod said non-negative, ticket says 1–200 with `limit: 0` invalid; built to the ticket.
  - [x] `before` validation: object with 1–128 char `sessionId` and parseable `updatedAt`, else `INVALID_MESSAGE`.
- [ ] Add `SessionSummaryFrame` and `SessionListMessage` to `src/types/messages.ts` `OutgoingMessage` and re-export the new types from `src/index.ts` (`ListSessionsMessage` into `IncomingMessage` is done).
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts` (round 4, `listSessions.test.ts`).
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` fields to ISO strings, and on error logging via `log.error('ws', ...)` and sending `ErrorCodes.SERVER_ERROR`.
- [ ] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`. (Round 4 added §5.9 `session_list` with one cited statement; the field table and the conversation-list spec are still owed.)
- [ ] Store without `listFor`: round 4 throws, so `wsErrorHandler` answers `SERVER_ERROR`. The ticket says `UNSUPPORTED` via a new `ErrorCodes` entry, but the dod acceptance test expects an empty `session_list`. Conflict between ticket and acceptance test: resolve before building this facet.
- [ ] Add `session_list`, `list_sessions` wire-level `error` handling for `transport.history` opt-in (ticket: off by default, answered with `UNSUPPORTED`).

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.