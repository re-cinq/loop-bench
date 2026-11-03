# Definition of Done

> Delivering a user's conversation list over the WebSocket protocol. A client holding a socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route. The engine already knows who is connected and replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `direct`** — A seam exists: the message handler dispatches on message type, and can add a new case for `list_conversations` to answer it off the non-locked path, beside `ping`.

## Done when these pass

- [ ] **Validation accepts list_conversations with valid bounds** — `limit` 1–200, `before` a valid cursor with `updatedAt` and `sessionId`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler returns conversation_list with summaries when enabled** — With `history: {enabled: true}` and store implementing `listFor`, returns `conversation_list` carrying summaries as ISO strings
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler ignores frame userId, uses ws.userId** — Even when frame carries another user's id, store's `listFor` is called with the connection's authenticated user id
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler passes limit and before to listFor unchanged** — `limit` and `before` reach the store method as the frame sent them
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler returns UNSUPPORTED error when history disabled** — With `history` absent or `enabled: false`, list request is answered with error code `UNSUPPORTED`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler returns UNSUPPORTED error when store has no listFor** — A store without the `listFor` method is answered with error code `UNSUPPORTED`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler returns SERVER_ERROR when listFor rejects** — A failing `listFor` is answered with error code `SERVER_ERROR`, socket stays open
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **list_conversations is answered immediately, not queued on lock** — While a `user_message` is streaming, a `list_conversations` frame is answered at once, not after the stream ends
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **No stream_end after conversation_list or error** — list_conversations and errors do not send terminal `stream_end` frames, unlike user_message
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary` (or `SessionSummary`), and `ConversationCursor` interfaces to `src/types/messages.ts`
- [ ] Add validation case for `list_conversations` in `src/transport/ws/validation.ts` with bounds checking on `limit` (1–200) and `before` cursor format
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes` in `src/types/session.ts`
- [ ] Update `createMessageHandler` signature to accept options with `sessionStore` and `historyEnabled`
- [ ] Add `list_conversations` case to message dispatcher in `src/transport/ws/messageHandler.ts` that answers off the non-locked path
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport` in `src/config.ts`
- [ ] Thread history config through `createServer` to `createMessageHandler`

## Out of scope

- Client reconnection with `?sessionId=<id>` — already implemented via existing resume path
- Second authorization path — the WebSocket is already authenticated once per connection
- Conversation content or credentials in summaries — the payload is metadata only
- Live sync between open tabs — ruled out in #124
- Server-side paging state — client pages with `before` cursor
- Deleting conversations from client — would need its own authorization decision
- Preview or title on summaries — own ticket