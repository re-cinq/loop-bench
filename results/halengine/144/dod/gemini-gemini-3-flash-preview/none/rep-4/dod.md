# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The `createMessageHandler` is the entry point for WebSocket messages. I can instantiate it with a mock-less session store and orchestrator to verify that it correctly handles `list_conversations` messages.

## Done when these pass

- [ ] **list conversations** — A `list_conversations` frame returns a `conversation_list` with the user's sessions when history is enabled.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **unsupported when disabled** — A `list_conversations` frame returns an `UNSUPPORTED` error when history is disabled.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **unsupported when store cannot list** — A `list_conversations` frame returns an `UNSUPPORTED` error when the store does not implement `listFor`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **authenticated user only** — The list returned is always for the authenticated user, ignoring any `userId` in the frame.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **off-lock execution** — A `list_conversations` request is answered immediately even if a `user_message` is streaming.
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` to `src/types/messages.ts`.
- [ ] Update `validateMessage` in `src/transport/ws/validation.ts` to handle `list_conversations`.
- [ ] Update `createMessageHandler` signature and implementation in `src/transport/ws/messageHandler.ts`.
- [ ] Update `createServer` in `src/transport/createServer.ts` to pass the store and config to the handler.
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/messages.ts`.
- [ ] Extend protocol spec in `specs/hal-engine-websocket-protocol/spec.md`.

## Out of scope

- Preview or title on summaries.
- Deleting a conversation.
- Server-side paging state.
- Operator view of another user's conversations.
- Live sync between open tabs.