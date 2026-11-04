# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The message handler already exists and can be extended. The validation layer already exists. The sender layer already exists. Acceptance tests directly call these existing entry points with the new message type and verify they handle it correctly, without waiting for full implementation.

## Done when these pass

- [ ] **Accepts and validates list_conversations messages** — `validateMessage` returns `{valid: true}` for `{type: 'list_conversations'}` with optional `limit` (1–200, integer) and `before` (cursor with `updatedAt` and `sessionId`), and rejects invalid fields
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Responds with conversation_list frame** — With `history: {enabled: true}` and a store holding conversations, a `list_conversations` message is answered with exactly one `conversation_list` frame carrying `ConversationSummary[]` with `createdAt` and `updatedAt` as ISO strings
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Ignores userId in frame** — A frame carrying `userId: '<another user>'` is answered with the connecting user's own list; the store's `listFor` is called with `ws.userId` not from the frame
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Passes limit and before to store** — The `limit` and `before` sent in the frame reach `listFor(userId, {limit, before})` with both possibly `undefined`
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Responds UNSUPPORTED when history disabled** — With `history` absent from config, `list_conversations` is answered with one `error` frame whose code is `UNSUPPORTED` and no `conversation_list`
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Responds UNSUPPORTED when no listFor** — With `history: {enabled: true}` against a store implementing no `listFor`, the answer is `UNSUPPORTED` error and no empty list
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Error handling for store rejection** — A `listFor` that rejects is answered with one `error` frame whose code is `SERVER_ERROR`, message carries no store detail, socket stays open, failure logged with session id
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Non-blocking message path** — A `list_conversations` sent while a `user_message` is streaming on the same session is answered before that turn's `stream_end`, not waiting on the per-session lock
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Reconnection with sessionId works** — A client that takes an id from `conversation_list` and reconnects with `?sessionId=<id>` receives `resumed: true` and that conversation's replay, using existing #45 path end to end
  `src/transport/ws/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationCursor`, `ConversationSummary`, `ConversationListMessage` to `src/types/messages.ts` (four new interfaces, no existing lines modified)
- [ ] Add `list_conversations` case to validation in `src/transport/ws/validation.ts` with `limit` (1–200 integer) and `before` (cursor) constraints
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes` in `src/types/session.ts`
- [ ] Extend message handler in `src/transport/ws/messageHandler.ts` to dispatch `list_conversations` off non-locked path
- [ ] Add history option to `HalEngineConfig.transport` with `{enabled: boolean}` shape
- [ ] Thread history config through `createServer` and message handler
- [ ] Call `store.listFor` when configured and available, pass `limit` and `before`, use `ws.userId` not frame
- [ ] Send `conversation_list` response with summaries as ISO strings, or `UNSUPPORTED`/`SERVER_ERROR` on error
- [ ] Add spec section to `specs/hal-engine-websocket-protocol/spec.md` covering the frames and auth rules
- [ ] Update `example/full-config.ts` with history option, run `npm run docs:fix` to regenerate `docs/getting-started.md`
- [ ] Add `StoreCannotList` export for stores that cannot list
- [ ] Add CHANGELOG entry under `## [Unreleased]`
- [ ] Verify spec links with `npm run check:spec-links`, `npm run check:spec-status`, `npm run spec:names`
- [ ] Bump version to MINOR
- [ ] Run `npm run verify` and confirm coverage floors hold

## Out of scope

- A preview or title on the summaries (separate issue #145)
- Deleting a conversation from the client
- Paging state held server-side (client pages with `before` cursor)
- Operator view of another user's conversations
- Live sync between open tabs (#124)