# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The WebSocket message handler already has a seam: it dispatches on message type. A new `list_conversations` message type will be validated and answered on the non-locked path beside `ping`. The feature is opt-in via a config flag, so tests can exercise both enabled and disabled states without architecture changes.

## Done when these pass

- [ ] **Message validation** — `validateMessage` accepts `list_conversations` frames with optional `limit` (1–200, integer) and `before` (cursor with `updatedAt` and `sessionId`), rejects invalid constraints, and drops unknown fields
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Server responds with conversation list when feature enabled** — With `history: {enabled: true}` and a store holding summaries, a `list_conversations` frame is answered with exactly one `conversation_list` frame carrying ISO-string dates, no `stream_end`, and newest-first ordering
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **User ID taken from connection, never frame** — A frame carrying `userId` of another user is answered with the authenticated connection's own list; `listFor` is called with `ws.userId`, asserted on the recorded argument
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Pagination parameters reach store** — `limit` and `before` cursor are passed through to store's `listFor` as sent, with both possibly `undefined` rather than omitted
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Error when feature disabled** — Without `history.enabled: true`, a `list_conversations` frame is answered with one `error` frame with code `UNSUPPORTED`, no `conversation_list`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Error when store doesn't support `listFor`** — With history enabled against a store with no `listFor` method, the answer is `error` with code `UNSUPPORTED`; no code path sends `conversations: []`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Error and logging when store rejects** — A `listFor` that rejects is answered with one `error` frame with code `SERVER_ERROR` whose message carries no store detail; the socket stays open; failure is logged with session id and no user content
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Off-lock behavior** — A `list_conversations` sent while a `user_message` is streaming on the same session is answered before that turn's `stream_end` — it does not wait on the per-session lock
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` interfaces to `src/types/messages.ts`, plus `ConversationSummary` and `ConversationCursor` payload types; update `IncomingMessage` and `OutgoingMessage` unions
- [ ] Add `list_conversations` case to `src/transport/ws/validation.ts` with constraints on `limit` and `before`
- [ ] Add `UNSUPPORTED` error code to `src/types/session.ts` `ErrorCodes`
- [ ] Extend `src/transport/ws/messageHandler.ts` to accept `SessionStore` and options; route `list_conversations` to handler on non-locked path
- [ ] Implement handler that reads store's `listFor`, converts dates to ISO strings, respects `history.enabled` flag
- [ ] Export `StoreCannotList` error class for store to throw when `listFor` is not supported (caught and answered as `UNSUPPORTED`)
- [ ] Thread `history` config through `HalEngineConfig.transport` to `createMessageHandler` via `createServer`
- [ ] Add `ConnectedMessage` check to ensure it's unchanged

## Out of scope

- Operator view of another user's conversations (authorization question)
- Conversation preview or title (separate issue #145)
- Deleting a conversation (erasure primitive needs its own authorization)
- Server-side paging state (client pages with `before` cursor)
- Live sync between open tabs (#124 ruled this out)
- Docs and changelog (acceptance tests pin behaviour)