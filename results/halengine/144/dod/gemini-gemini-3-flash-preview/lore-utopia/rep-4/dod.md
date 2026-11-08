# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists in the `messageHandler` which I can call with a mock WebSocket and a `ChatSession` backed by an `InMemorySessionStore`. The acceptance tests will exercise the new `list_conversations` frame and assert on the `conversation_list` and `error` responses.

## Done when these pass

- [ ] **Answers the user's conversations newest first** — With `history: {enabled: true}` and a store holding three conversations for the user, a `list_conversations` frame is answered with exactly one `conversation_list` carrying three summaries, newest first, each `createdAt` and `updatedAt` an ISO string, and no `stream_end`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **Answers the connecting user's own conversations even when the frame names another user** — A frame carrying `{type: 'list_conversations', userId: '<another user>'}` is answered with the connecting user's own list, and the store's `listFor` is called with `ws.userId`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **Refuses the frame when history is disabled** — With `history` absent or `enabled: false`, the same frame is answered with one `error` frame whose code is `UNSUPPORTED` and no `conversation_list`.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **Answers UNSUPPORTED when the store cannot list** — With `history: {enabled: true}` against a store implementing no `listFor`, the answer is the same `error` frame, and no `conversation_list` is sent.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **Answers a list in the middle of a streaming turn, before that turn ends** — A `list_conversations` sent while a `user_message` is streaming on the same session is answered before that turn's `stream_end` — it does not wait on the lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` to `src/types/messages.ts`
- [ ] Add `list_conversations` validation to `src/transport/ws/validation.ts`
- [ ] Add `history` config to `HalEngineConfig` in `src/config.ts`
- [ ] Implement `list_conversations` handling in `src/transport/ws/messageHandler.ts`
- [ ] Export `StoreCannotList` and use it to signal `UNSUPPORTED` error

## Out of scope

- A preview or title on the summaries
- Deleting a conversation from the client
- Paging state held server-side
- Operator view of another user's conversations
- Live sync between open tabs