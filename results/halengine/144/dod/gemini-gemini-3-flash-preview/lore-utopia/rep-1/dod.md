# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists in `createMessageHandler` and `validateMessage` where new message types can be added and handled.

## Done when these pass

- [x] **Protocol validation** — `validateMessage` correctly validates `list_conversations` with its optional `limit` and `before` (cursor) fields, and rejects invalid values.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **Successful list delivery** — When `transport.history.enabled` is true, a `list_conversations` frame returns a `conversation_list` with the authenticated user's conversations from the store, newest first, with ISO date strings.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **Feature opt-in** — When `transport.history.enabled` is false or absent, a `list_conversations` frame is answered with an `error` frame carrying the `UNSUPPORTED` code.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **Security: User Isolation** — The `userId` is always taken from the WebSocket connection (`ws.userId`), even if a `userId` is provided in the frame.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **Concurrent handling** — A `list_conversations` request is answered immediately and does not wait for the per-session lock (e.g., during a streaming assistant reply).
  `src/transport/ws/conversationList.acceptance.test.ts`
- [x] **Store compatibility** — A store that does not implement `listFor` or throws `StoreCannotList` is answered with an `error` frame carrying `UNSUPPORTED`.
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [x] Add `list_conversations` and `conversation_list` to protocol message types.
- [x] Implement `list_conversations` validation.
- [x] Update `createMessageHandler` to take `sessionStore` and `history` options.
- [x] Implement `handleListConversations` in `messageHandler.ts`, ensuring it runs outside the lock.
- [x] Update `HalServerOptions` and `createServer` to support `history` config.
- [x] Extend protocol spec and documentation.

## Out of scope

- Preview or title on summaries.
- Deleting a conversation from the client.
- Server-side paging state.
- Operator view of another user's conversations.
- Live sync between open tabs.