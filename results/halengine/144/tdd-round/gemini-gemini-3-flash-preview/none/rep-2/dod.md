# Definition of Done

> #143 gives a consumer `store.listFor(userId)` inside the server process. The client on the other end of the WebSocket has no way to ask for it, and the consumer who wants a conversation picker without standing up their own REST endpoint has to write one anyway.

**Strategy: `direct`** — `createServer` and the WebSocket upgrade/message pipeline already exist and accept frames over a real WebSocket connection, so acceptance tests can connect today, send `list_conversations` frames, and fail directly on the missing `conversation_list` and `list_conversations` validation/dispatch behaviour.

## Done when these pass

- [x] **listing conversations over the WebSocket protocol › answers list_conversations for the authenticated user with ISO dates, forwarding limit and before while ignoring any client userId** — Sends `{type: 'list_conversations', limit, before, userId}` over a connected WebSocket and verifies `store.listFor` is called with the socket's authenticated `userId` (`session.userId`) and `{limit, before}`, answering `{type: 'conversation_list', conversations}` with `createdAt` and `updatedAt` serialised as ISO-8601 strings.
      `src/transport/conversationList.acceptance.test.ts`

- [x] **listing conversations over the WebSocket protocol › answers UNSUPPORTED when the store has no listFor, and SERVER_ERROR with a ws error log when listFor throws** — Verifies that a store without `listFor` answers `{type: 'error', code: 'UNSUPPORTED'}` and a store whose `listFor` throws/rejects logs an error under category `'ws'` with the userId and error message and answers `{type: 'error', code: 'SERVER_ERROR'}`.
      `src/transport/conversationList.acceptance.test.ts`

- [x] **listing conversations over the WebSocket protocol › accepts a bare list_conversations frame and rejects a malformed limit or before with INVALID_MESSAGE without calling listFor** — Verifies that `{type: 'list_conversations'}` is accepted while non-integer or negative `limit` values and malformed `before` cursors (`sessionId` outside 1–128 chars or unparseable `updatedAt`) are rejected with `INVALID_MESSAGE` without invoking `store.listFor`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [x] Add `ListConversationsMessage`, `SessionSummaryFrame`, and `ConversationListMessage` to `src/types/messages.ts`, include them in `IncomingMessage` and `OutgoingMessage`, and re-export them from `src/index.ts`.
- [x] Validate `list_conversations` frames in `src/transport/ws/validation.ts` (optional non-negative integer `limit`; optional `before` object with 1–128 char `sessionId` and finite-date `updatedAt` string or number; strip unknown fields like `userId`).
- [x] Thread `sessionStore` into `createMessageHandler` (optional parameter so existing 1-arg and 2-arg callers keep working) and wire it in `src/transport/createServer.ts`.
- [x] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` (and helper in `src/transport/ws/sender.ts` if needed) by reading `session.userId`, calling `await sessionStore?.listFor?.(session.userId, {limit, before})`, serialising `Date` for the `conversations` field to ISO strings, and on missing `listFor` or `StoreCannotList` error answering `ErrorCodes.UNSUPPORTED`. On any other error, log via `log.error('ws', ...)` and send `ErrorCodes.SERVER_ERROR`.
- [x] Document `list_conversations` and `conversation_list` in `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
- [x] Fix CI failures: eslint (prefer-early-return, require-spec-link, no-duplicate-code, max-expects, declare-near-use, nested-if, require-status-matches-coverage), spec-names, changelog typos, and acceptance test typo.

## Out of scope

- Conversation titles or previews (first user message, model-generated title).
- Deleting or renaming a conversation from the client over the socket.
- Switching the socket's active session in place (`?sessionId=` on reconnect is how a conversation is rejoined).
- Holding pagination cursor state server-side (the client pages with `before`).
- An operator view of another user's conversations or live sync between open tabs.