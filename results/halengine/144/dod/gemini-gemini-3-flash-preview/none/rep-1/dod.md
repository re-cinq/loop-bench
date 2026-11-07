# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The WebSocket transport already has a message handling seam (`messageHandler.ts`) and a validation seam (`validation.ts`). Acceptance tests can use `createServer` and real WebSocket connections (or the `wsTestSupport.ts` helpers) to exercise the new messages.

## Done when these pass

- [ ] **list_conversations success** — With history enabled and a store holding conversations, a `list_conversations` frame is answered with a `conversation_list` carrying summaries, newest first, with ISO dates.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations authorization** — A frame carrying a `userId` is ignored in favor of the connection's authenticated user ID, ensuring no one can list another user's conversations.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations disabled** — With history disabled in config, or a store that cannot list, the server answers with an `UNSUPPORTED` error.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations validation** — Invalid `limit` (e.g., 0, 201) or malformed `before` cursor are rejected with `INVALID_MESSAGE`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations concurrency** — A list request sent while a message is streaming is answered immediately, without waiting for the lock.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations error: store rejection** — If the store fails (rejects), the server answers with `SERVER_ERROR` and no internal details, keeping the socket open.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations error: StoreCannotList** — If the store explicitly throws `StoreCannotList`, the server answers with `UNSUPPORTED`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations resume integration** — A client can take a `sessionId` from a `conversation_list` and successfully resume that session via the existing resume protocol.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `list_conversations` and `conversation_list` to `IncomingMessage` and `OutgoingMessage` types.
- [ ] Implement validation for `list_conversations` in `validation.ts`.
- [ ] Update `createMessageHandler` to take the session store and handle `list_conversations`.
- [ ] Wire the handler in `createServer.ts` and respect the `history.enabled` config.
- [ ] Ensure the handler skips the `PerSessionLock`.
- [ ] Extend `specs/hal-engine-websocket-protocol/spec.md` and `specs/hal-engine-conversation-list/spec.md`.
- [ ] Update documentation and example config.

## Out of scope

- Previews or titles on summaries.
- Deleting conversations from the client.
- Live sync between open tabs.