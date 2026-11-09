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

- [x] Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`. — `ListSessionsMessage` landed with the validator (2026-11-06); `SessionSummaryFrame`, `SessionListMessage`, the `OutgoingMessage` member and all three `src/index.ts` re-exports landed with the handler round (2026-11-06).
- [x] Validate `list_sessions` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`). ([validated by: returns the limit and cursor a list_sessions frame carries, and refuses a malformed one](../src/transport/ws/validation.test.ts#L25))
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`.
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` fields to ISO strings, and on error logging via `log.error('ws', ...)` and sending `ErrorCodes.SERVER_ERROR`. ([validated by: answers list_sessions with the session user's own list, ISO-dated, passing limit and before through](../src/transport/ws/messageHandler.test.ts#L94))
- [x] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`. — done (2026-11-06): the protocol spec gained §4.3 `list_sessions` (field table, constraints, the authorisation rule — the user id is the connection's, never the frame's) and §5.9 `session_list` (field table, the GDPR note, empty list for a store without `listFor`, `SERVER_ERROR` for a rejecting one), plus a security-considerations bullet; the conversation-list spec section was already in place. All citations name their tests (`spec:names` 810 clean) and the anchors pass `repoint-spec-anchors --check origin/main`.
- [x] Repoint the three spec anchors the acceptance-test commit wrote off their `it(` lines (`#L87/#L129/#L161` → `#L93/#L134/#L163` in `specs/hal-engine-conversation-list/spec.md`); `repoint-spec-anchors.mjs --check origin/main` gates CI and reported them rotten. — the handler round's dedup shifted these lines again; anchors re-synced from test names with `check-spec-anchor-names.mjs --fix` (2026-11-06).
- [x] Add a `CHANGELOG.md` entry under `## [Unreleased]` written for somebody installing the package (ticket criterion).
- [ ] Bump the version MINOR (new optional protocol frames; PR body says so) (ticket criterion).

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.