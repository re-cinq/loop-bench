# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists in `createMessageHandler` which takes a session store and an orchestrator. The acceptance tests can mock the store's `listFor` and verify the WebSocket frames.

## Done when these pass

- [ ] **protocol validation** — `validateMessage` correctly validates or rejects `list_conversations` frames.
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **deliver conversation list** — With `history` enabled, `list_conversations` returns a `conversation_list` frame with the correct summaries, newest activity first.
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **authorization** — A `list_conversations` frame carrying another user's `userId` is ignored, and the connecting user's list is returned instead.
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **paging parameters** — `limit` and `before` (as a cursor) are correctly passed to the store's `listFor`.
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **disabled feature** — With `history` disabled, `list_conversations` is answered with an `UNSUPPORTED` error.
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **unsupported store** — A store that does not implement `listFor` results in an `UNSUPPORTED` error.
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **concurrent request** — `list_conversations` is answered immediately even while a `user_message` is streaming (off-lock).
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **reconnection and replay** — Reconnecting with a `sessionId` from a `conversation_list` correctly resumes the session.
  `src/transport/ws/ConversationList.acceptance.test.ts`

- [ ] **protocol stability** — Every message literal valid before this change still compiles, and new messages are rejected until implemented.
  `src/transport/ws/ConversationList.acceptance.test.ts`

## Facets

- [x] Extend `specs/hal-engine-websocket-protocol/spec.md` with new message types and rules.
- [ ] Add `ListConversationsMessage` and `ConversationListMessage` to `src/types/messages.ts`.
- [ ] Implement validation for `list_conversations` in `src/transport/ws/validation.ts`.
- [ ] Implement handling for `list_conversations` in `src/transport/ws/messageHandler.ts`.
- [ ] Update `HalEngineConfig` to include `transport.history`.
- [ ] Update `docs/getting-started.md` via `example/full-config.ts`.

## Out of scope

- Preview or title on summaries.
- Deleting conversations from the client.
- Paging state held server-side.
- Operator view of another user's conversations.
- Live sync between open tabs.