# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The WebSocket message handling seam already exists in `createMessageHandler`. The acceptance tests can call the returned `handleMessage` function with a mock WebSocket and session, verifying that the new message types are handled correctly according to the configuration and store support.

## Done when these pass

- [ ] **rejects list_conversations with invalid limit** — A `list_conversations` frame with an invalid `limit` (e.g., 0, 201, 1.5, or a string) results in an `error` frame with code `INVALID_MESSAGE`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **rejects list_conversations with invalid before cursor** — A `list_conversations` frame with an invalid `before` cursor (e.g., missing `updatedAt` or `sessionId`) results in an `error` frame with code `INVALID_MESSAGE`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **returns conversation_list when history is enabled** — With `transport.history.enabled: true`, a valid `list_conversations` frame results in a `conversation_list` frame containing the user's conversations from the store.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **ignores userId in frame and uses ws.userId** — A `list_conversations` frame containing a `userId` field is handled by using the `userId` from the WebSocket connection itself, and `listFor` is called with that `userId`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **returns UNSUPPORTED when history is disabled** — When `transport.history.enabled` is `false` or absent, a `list_conversations` frame results in an `error` frame with code `UNSUPPORTED`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers list_conversations off-lock** — A `list_conversations` message is answered even if another message is currently being processed (the per-session lock is not held for it).
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] `IncomingMessage` and `OutgoingMessage` unions in `src/types/messages.ts` include the new message types.
- [ ] `validateMessage` in `src/transport/ws/validation.ts` handles `list_conversations` validation.
- [ ] `handleMessage` in `src/transport/ws/messageHandler.ts` routes `list_conversations` to a handler that calls `sessionStore.listFor`.
- [ ] `createServer` in `src/transport/createServer.ts` and `HalEngineConfig` in `src/config.ts` support the new history configuration.
- [ ] `ErrorCodes` includes `UNSUPPORTED`.

## Out of scope

- Preview or title on summaries.
- Deleting conversations from the client.
- Paging state held server-side.
- Operator view of another user's conversations.
- Live sync between open tabs.