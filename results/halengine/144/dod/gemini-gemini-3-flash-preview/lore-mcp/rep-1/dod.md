# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists in the WebSocket message handler and server configuration. The acceptance tests can call the real entry point (WebSocket server) and fail on absent behavior.

## Done when these pass

- [ ] **accepts a valid list_conversations frame** — A valid `list_conversations` frame is answered with a `conversation_list` carrying the user's summaries.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **accepts list_conversations with valid limit and before** — `limit` (1-200) and `before` (cursor object) are accepted and reach the session store.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **rejects list_conversations with invalid limit** — `limit: 0`, `limit: 201`, `limit: 1.5`, and non-numeric limits are rejected with `INVALID_MESSAGE`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **rejects list_conversations with invalid before cursor** — `before` with missing fields or invalid types is rejected with `INVALID_MESSAGE`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **uses the authenticated user id from the socket, not the frame** — The handler uses `ws.userId` and ignores any `userId` field in the frame.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers with UNSUPPORTED when history is disabled** — When `transport.history.enabled` is false, `list_conversations` is answered with `UNSUPPORTED`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers with UNSUPPORTED when the store does not implement listFor** — A store missing the `listFor` method is answered with `UNSUPPORTED`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **answers list_conversations immediately even if a user_message is running** — History requests do not queue behind the per-session lock for streaming answers.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` to `src/types/messages.ts`.
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`.
- [ ] Implement `list_conversations` validation in `src/transport/ws/validation.ts`.
- [ ] Add `history` opt-in to `HalEngineConfig` and thread it to `createServer`.
- [ ] Handle `list_conversations` in `createMessageHandler` on the non-locked path.
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` and documentation.

## Out of scope

- Preview or title on summaries.
- Deleting conversations from the client.
- Paging state held server-side.
- Operator view of another user's conversations.
- Live sync between open tabs.