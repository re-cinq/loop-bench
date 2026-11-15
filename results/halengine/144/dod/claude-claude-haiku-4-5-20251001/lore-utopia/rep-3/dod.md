# Definition of Done

> A consumer may have no such route to extend: an engine deployment behind an api with a session store and no conversation endpoints of its own has nothing to add this to. The engine already knows who is connected and already replays a conversation on resume; answering "which conversations do I have" over the same socket is the smaller surface.

**Strategy: `parallel-change`** — The message handler currently handles `user_message` and `ping`. We need to add `list_conversations` handling as a new message type that answers off the non-locked path (like `ping`). The handler exists but does not yet dispatch this message type. A new message type and response frame must be added to the protocol and validated.

## Done when these pass

- [ ] **Validation accepts and rejects list_conversations correctly** — limit must be 1–200, before must be a valid date string
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **Handler returns conversation_list with metadata** — with history enabled and a store supporting listFor, returns exactly one conversation_list frame carrying three summaries as ISO strings, no stream_end
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **User id comes from ws.userId not frame** — a frame with userId field is ignored, store.listFor is called with ws.userId
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **Parameters reach store listFor** — limit and before are passed through to the store as the frame sent them
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **History disabled returns UNSUPPORTED** — with history absent or disabled, list_conversations receives error UNSUPPORTED
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **Store without listFor returns UNSUPPORTED** — with a store implementing no listFor, the answer is error UNSUPPORTED, no empty list
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **Store rejection returns SERVER_ERROR** — when store.listFor rejects, returns error SERVER_ERROR with no store detail
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **No stream_end on list response** — list_conversations is not a turn and does not emit stream_end
  `src/transport/ws/conversation-list.acceptance.test.ts`
- [ ] **Metadata only, never content** — conversation_list carries sessionId, createdAt, updatedAt, entryCount as ISO strings; never entries or content
  `src/transport/ws/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary` types to `src/types/messages.ts`
- [ ] Update `IncomingMessage` union to include `ListConversationsMessage`
- [ ] Update `OutgoingMessage` union to include `ConversationListMessage`
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`
- [ ] Update message handler dispatch to recognize and handle `list_conversations`
- [ ] Wire `history` config option through `HalEngineConfig.transport`
- [ ] Update `createServer` to accept and pass history options to message handler

## Out of scope

- The `before` cursor in this PR handles only ISO date strings, not composite {updatedAt, sessionId} cursors mentioned in amendments (follow-up)
- Picking a conversation with `?sessionId=<id>` (already in #45 path)
- Preview/title on summaries
- Deleting a conversation
- Paging state server-side
- Operator view of another user's conversations
- Live sync between tabs