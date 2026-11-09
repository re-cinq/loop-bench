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

- [x] Add `ListSessionsMessage`, `SessionSummaryFrame`, and `SessionListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`. — `ListSessionsMessage` was in and member of `IncomingMessage` (validation round); the two outgoing types, the `OutgoingMessage` member and the `src/index.ts` re-exports are in (handling round).
- [x] Validate `list_sessions` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`). ([validated by: accepts list_sessions, returns it stripped to limit and before, and refuses a bad field by name](../src/transport/ws/validation.test.ts#L24)) — the CI eslint round rejected the wire-name-keyed dispatch table this facet introduced (camelcase on `user_message`/`list_sessions`), so the dispatch is back on the `switch` the ADR-006 `validateMessage` entry documents, with that entry's suppression restored for the third case.
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`. ([validated by: answers from the session's own user, forwarding the frame's limit and before, with ISO date strings](../src/transport/ws/messageHandler.test.ts#L874))
- [x] Handle `list_sessions` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` fields to ISO strings, and on error logging via `log.error('ws', ...)` and sending `ErrorCodes.SERVER_ERROR`. ([validated by: answers from the session's own user, forwarding the frame's limit and before, with ISO date strings](../src/transport/ws/messageHandler.test.ts#L874), [validated by: answers a store without listFor with an empty list, and a failing one with an error that names no store detail](../src/transport/ws/messageHandler.test.ts#L916))
- [x] Document `list_sessions` and `session_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`. — the conversation-list spec's § Over the WebSocket protocol is in and cites the unit tests; the protocol spec's frames section (§ 4.3 list_sessions, § 5.9 session_list: field tables, the authorisation rule, the store-failure answers) is in and cites the same tests.
- [x] Add § Conversation list to `docs/getting-started.md` by editing `example/full-config.ts` and regenerating with `npm run docs:fix`, so the guide walks a client through sending `list_sessions`, paging with `limit`/`before`, and reopening a row with `?sessionId=` — in: the § Conversation List section walks the frame, paging with both cursor fields, and reopening a row, saying `resume` is what makes a row openable; `example/full-config.ts`'s session-store line names `listFor` as what serves the frame and `npm run docs:fix` regenerated the listing; the CHANGELOG's `listFor` entry no longer claims nothing serves it yet.
- [x] Answer non-turn frames in arrival order per socket, so a frame's answer precedes the pong of a frame that arrived after it — the barrier every acceptance test of this ticket leans on: a store still answering a `list_sessions` holds a later `ping`'s pong behind it, while the list still queues behind no streaming turn. ([validated by: answers in the order the frames arrived, the list before the pong of a ping sent after it](../src/transport/ws/messageHandler.test.ts#L941), [validated by: answers a list_sessions sent while a turn is streaming before that turn ends, waiting on no lock](../src/transport/ws/messageHandler.test.ts#L968))

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.