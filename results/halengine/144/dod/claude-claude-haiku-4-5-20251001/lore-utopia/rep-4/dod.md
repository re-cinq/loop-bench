# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The WebSocket message handler already has a seam through validation and dispatch. Acceptance tests call `validateMessage` directly and compose a message handler with mocked orchestrator and store, exercising the real entry point and failing on the absence of the feature.

## Done when these pass

- [ ] **Message validation accepts list_conversations** — `validateMessage({type: 'list_conversations'})` returns valid, and rejects invalid `limit` (0, 201, 1.5, '10') and invalid `before` (plain string) with error messages naming the field
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler returns conversation_list with summaries** — A `list_conversations` frame answered with `history.enabled: true` and a store holding three conversations returns exactly one `conversation_list` carrying three summaries newest-first, each with `createdAt` and `updatedAt` as ISO strings, and no `stream_end`
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler uses connection userId, not frame userId** — A frame carrying `userId: '<another user>'` is answered with the connecting user's own list, and the store's `listFor` is called with `ws.userId` from the connection, not from the frame
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler passes limit and before to store** — `limit` and `before` reach `listFor` as the frame sent them, both possibly `undefined`, passed as `{limit, before}` options
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler returns UNSUPPORTED when history disabled** — With `history.enabled: false`, the same frame is answered with one `error` frame whose code is `UNSUPPORTED` and no `conversation_list`
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler returns UNSUPPORTED when store has no listFor** — With `history.enabled: true` against a store implementing no `listFor`, the answer is the same `error` frame with code `UNSUPPORTED`
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler returns SERVER_ERROR on store rejection** — A `listFor` that rejects is answered with one `error` frame whose code is `SERVER_ERROR` and whose message carries no store detail
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler answers list_conversations off the lock** — A `list_conversations` sent while a user_message is streaming on the same session is answered without waiting on the per-session lock
  `src/transport/ws/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` to `IncomingMessage` and `ConversationListMessage` and its payload types to `OutgoingMessage` in `src/types/messages.ts`
- [ ] Add `list_conversations` validation case to `validateMessage` in `src/transport/ws/validation.ts`
- [ ] Update `createMessageHandler` signature to accept `store` and `options: {history?: {enabled: boolean}}`
- [ ] Implement handler dispatch for `list_conversations` on the non-locked path
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes` in `src/types/session.ts`
- [ ] Thread `history` options through `createServer` and `HalEngineConfig`
- [ ] Handle `StoreCannotList` exception (from #143) as `UNSUPPORTED` error

## Out of scope

- Documentation updates, spec statements, CHANGELOG, version bump, example config
- Resume integration test (existing #45 path)
- Validation of cursor structure beyond presence/type checks
- GDPR documentation and compliance checks