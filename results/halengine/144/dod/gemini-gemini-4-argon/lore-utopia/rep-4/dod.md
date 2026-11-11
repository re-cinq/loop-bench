# Definition of Done

> #143 gives a consumer `store.listFor(userId)` on the server, and nothing on the wire. A browser chat client connects over WebSocket and never sees the store: to render a sidebar of previous conversations so the user can pick one and reconnect with `?sessionId=<id>` (#45), it needs a protocol frame that asks for the list and a frame that answers it, gated by an explicit transport option the way resume is.

**Strategy: `direct`** — `createServer`, `createHalEngine`, and `validateMessage` already exist and accept WebSocket frames and transport options. Acceptance tests drive `validateMessage` and real WebSocket connections against `createServer` and `createHalEngine` today and fail because `list_conversations` validation, `transport.history`, `conversation_list`, `ErrorCodes.UNSUPPORTED`, and `StoreCannotList` are not yet implemented.

## Done when these pass

- [ ] **validates list_conversations with an optional 1..200 integer limit and a composite before cursor, and rejects malformed fields by name** — Verifies `validateMessage` accepts `{type: 'list_conversations'}` (stripping extra fields like `userId`) and valid `limit` (`1..200`) / `before` (`{updatedAt, sessionId}`) options, while rejecting `limit: 0`, `limit: 201`, `limit: 1.5`, `limit: '10'`, and malformed `before` cursors with an error message naming the field.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations with the connected user conversations newest first as ISO summaries, forwards limit and before to listFor with ws.userId, and resumes a listed id** — Verifies that with `transport.history: {enabled: true}` (via `createHalEngine`), `list_conversations` answers one `conversation_list` frame (and no `stream_end`) with ISO `createdAt`/`updatedAt` strings in newest-first order for the socket's authenticated user (`ws.userId`, ignoring any `userId` in the frame), forwards `{limit, before}` to `store.listFor`, and allows reconnecting with `?sessionId=<id>` to resume a listed conversation.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations while a user_message is streaming without waiting on the session lock** — Verifies that a `list_conversations` frame sent while a `user_message` turn is actively streaming is answered before that turn's `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers UNSUPPORTED when history is off, store.listFor is absent, or the store throws StoreCannotList, and answers SERVER_ERROR without store detail when listFor rejects** — Verifies that when `history` is disabled, `store.listFor` is unimplemented, or the store throws `StoreCannotList` (such as `MongoSessionStore` on a collection without `find`), the server replies with `error` (`UNSUPPORTED`) rather than `conversations: []`, and when `store.listFor` rejects with a transient error, the server replies with `error` (`SERVER_ERROR`) without leaking store error details.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Export `ConversationCursor`, `ListConversationsPayload`, `ConversationSummary`, and `ConversationListMessage` from `src/types/messages.ts` (and `src/index.ts`), add them to `IncomingMessage` and `OutgoingMessage`, and add `UNSUPPORTED: 'UNSUPPORTED'` to `ErrorCodes` in `src/types/session.ts`.
- [ ] Export `StoreCannotList` from `src/types/sessionStore.ts` (and `src/index.ts`) and throw `new StoreCannotList(...)` in `MongoSessionStore.listFor` when `collection.find` is absent.
- [ ] Extend `validateMessage` in `src/transport/ws/validation.ts` to validate `list_conversations` (`limit` integer `1..200` when present; `before` an object with a `Date.parse`-able `updatedAt` string and non-empty `sessionId` string when present, with error messages naming `limit` or `before`).
- [ ] Add `ConversationHistoryOptions` (`{enabled: boolean}` with GDPR retention doc comment pointing to #41), wire `history?: ConversationHistoryOptions` through `HalServerOptions` in `src/transport/createServer.ts` and `HalEngineConfig['transport']` in `src/config.ts` (logging a startup warning when `history.enabled` is true without `resume.enabled`), and update `example/full-config.ts` and `docs/getting-started.md`.
- [ ] Handle `list_conversations` in `src/transport/ws/messageHandler.ts` outside the per-session lock: reply `UNSUPPORTED` when `history?.enabled` is not true, `store.listFor` is absent, or `listFor` throws `StoreCannotList`; call `await store.listFor(ws.userId, {limit, before})`, serialize dates to ISO strings in `conversation_list`; and catch other rejections to log with `sessionId` and reply `SERVER_ERROR` with no store detail and no `stream_end`.
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md` and `CHANGELOG.md` under `## [Unreleased]`.

## Out of scope

- Previews or titles on conversation summaries.
- Deleting a conversation over the socket (#145).
- Server-side paging cursor state (the client pages with `before`).
- Operator views of another user's conversations.
- Live sync of conversation lists between open tabs (#124).