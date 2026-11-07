# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists in `createMessageHandler` (already taking the orchestrator and store) and `createServer` (handling the WebSocket upgrade and session management). The acceptance tests will exercise the WebSocket message handling and integration with the session store.

## Done when these pass

- [ ] **list_conversations validation** — Invalid `limit` (0, 201, 1.5, '10') or `before` (missing field, not a cursor) results in `INVALID_MESSAGE`.
  `src/transport/ws/listConversations.acceptance.test.ts`
- [ ] **listFor integration and error handling** — `limit` and `before` reach the store correctly; a store throwing `SERVER_ERROR` or the new `StoreCannotList` (resulting in `UNSUPPORTED`) is handled correctly.
  `src/transport/ws/listConversations.acceptance.test.ts`
- [ ] **reconnection from list** — A client can take a session id from a `conversation_list` and successfully reconnect to that session, receiving a replay.
  `src/transport/ws/listConversations.acceptance.test.ts`
- [ ] **delivers the conversation list** — Existing tests in `conversationList.acceptance.test.ts` must pass.
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Define `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary`, `ConversationCursor` in `src/types/messages.ts`.
- [ ] Update `validateMessage` in `src/transport/ws/validation.ts` to handle `list_conversations`.
- [ ] Update `createMessageHandler` in `src/transport/ws/messageHandler.ts` to handle `list_conversations` without locking.
- [ ] Implement `StoreCannotList` and handle it in the message handler.
- [ ] Update `HalEngineConfig` to include `transport.history`.
- [ ] Extend specs and docs.

## Out of scope

- Preview or title on summaries.
- Deleting a conversation from the client.
- Paging state held server-side.
- Operator view of another user's conversations.
- Live sync between open tabs.