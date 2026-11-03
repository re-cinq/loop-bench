# Definition of Done

> #144 Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists at the message validation and handler layers. Acceptance tests call `validateMessage` and `createMessageHandler` directly with real wire formats, expecting them to fail because the feature does not exist.

## Done when these pass

- [ ] **Message validation accepts and validates list_conversations** — validates limit 1–200, rejects limit out of range or non-integer, accepts before as cursor object with updatedAt ISO string and sessionId, rejects userId in frame
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Handler answers list_conversations with conversation_list frame** — with history enabled and a store implementing listFor, returns exactly one conversation_list carrying summaries with ISO string timestamps, no stream_end, and calls listFor with connection's userId and request options
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **History gate controls feature** — with history disabled (default), list_conversations answered with error UNSUPPORTED; with enabled but store has no listFor, same error; listFor rejection answered with SERVER_ERROR, no store details
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Non-blocking on session lock** — list_conversations answered immediately while user_message streams, does not wait on per-session lock
  `src/transport/ws/conversation-list.acceptance.test.ts`

- [ ] **Resumed session via list id** — conversation id from conversation_list can be used to reconnect with ?sessionId=<id>
  `src/transport/ws/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add ListConversationsMessage, ConversationListMessage, ConversationCursor, ConversationSummary types to messages.ts (additive only, no existing line edited)
- [ ] Add list_conversations case to validation.ts, validating limit 1–200 integer, before as cursor or absent, no userId
- [ ] Add UNSUPPORTED error code to ErrorCodes
- [ ] Add historyEnabled config to orchestrator (passed through createMessageHandler)
- [ ] Implement list_conversations handler in messageHandler.ts: non-queued path like ping, return conversation_list or error per history config and listFor availability
- [ ] Add history config option to HalEngineConfig.transport
- [ ] Update example/full-config.ts and run npm run docs:fix

## Out of scope

- CHANGELOG, version bump, spec citations, doc links (next round's work after tests pass)
- Conversation deletion, preview titles, live sync, operator view of other users' history, server-side paging state (separate issues)