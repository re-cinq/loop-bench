# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists in `validateMessage` and `createMessageHandler`. The acceptance tests will call these entry points directly to verify the new protocol frames and their handling.

## Done when these pass

- [x] **validateMessage accepts list_conversations** — `validateMessage({type: 'list_conversations'})` is valid and returns the typed frame.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **validateMessage rejects invalid list_conversations** — Rejects invalid `limit` (not 1-200) or `before` (missing `updatedAt` or `sessionId`) with `INVALID_MESSAGE`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **handleMessage answers list_conversations when enabled** — When `history.enabled` is true, a `list_conversations` frame yields a `conversation_list` frame with ISO-formatted summaries from the store's `listFor`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **handleMessage answers UNSUPPORTED when disabled** — When `history.enabled` is false or absent, a `list_conversations` frame yields an `error` frame with code `UNSUPPORTED`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **handleMessage uses ws.userId, not frame userId** — A `list_conversations` frame carrying another user's ID is answered with the connecting user's own list, and the store is called with `ws.userId`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **handleMessage answers UNSUPPORTED for store without listFor** — If the session store does not implement `listFor`, the answer is an `error` frame with code `UNSUPPORTED`.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **handleMessage answers SERVER_ERROR when listFor fails** — If `listFor` rejects with an error, the answer is an `error` frame with code `SERVER_ERROR` and no internal details.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **handleMessage answers list_conversations out-of-band** — A `list_conversations` message sent while a `user_message` is streaming is answered immediately, without waiting for the per-session lock.
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Define `ListConversationsMessage` and `ConversationListMessage` in `src/types/messages.ts`.
- [ ] Add `UNSUPPORTED` to `ErrorCodes` in `src/types/session.ts`.
- [ ] Update `validateMessage` in `src/transport/ws/validation.ts` to handle `list_conversations`.
- [ ] Update `createMessageHandler` in `src/transport/ws/messageHandler.ts` to handle `list_conversations` and check config.
- [ ] Update `createServer` in `src/transport/createServer.ts` and `createHalEngine` in `src/config.ts` to thread through the new config.
- [ ] Update `specs/hal-engine-websocket-protocol/spec.md` and `docs/getting-started.md`.

## Out of scope

- Paging state held server-side.
- Deleting a conversation from the client.
- Operator view of another user's conversations.
- Live sync between open tabs.