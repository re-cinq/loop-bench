# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The WebSocket message handler is a seam that already exists; the acceptance tests call the real `validateMessage` and handler functions, verifying that they reject or accept the new `list_conversations` frame and respond with `conversation_list` or error frames as specified.

## Done when these pass

- [ ] **Message validation accepts `list_conversations`** — Validates that `list_conversations` frames with valid parameters are accepted, and frames with invalid `limit` or `before` values are rejected with field-specific errors
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **Handler sends `conversation_list` when feature is enabled** — Verifies that when `history: {enabled: true}` and the store implements `listFor`, a `list_conversations` frame is answered with a `conversation_list` frame carrying summaries with `createdAt` and `updatedAt` as ISO strings
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **Handler enforces authorization and passes parameters correctly** — Confirms that `userId` in the frame is ignored and `ws.userId` is always used; that `limit` and `before` are passed to `listFor` unchanged
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **Handler rejects when history is disabled or store lacks `listFor`** — Verifies that `list_conversations` is answered with error code `UNSUPPORTED` when `history` is absent or `{enabled: false}`, or when the store does not implement `listFor`
      `src/transport/ws/listConversations.acceptance.test.ts`

- [ ] **Handler answers `list_conversations` off the per-session lock during streaming** — Confirms that a `list_conversations` frame sent while a `user_message` is streaming is answered before that turn's `stream_end`, proving it does not block on the session lock
      `src/transport/ws/listConversations.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage`, `ConversationListMessage`, `ConversationSummary` types to `src/types/messages.ts`; add `list_conversations` case to `validateMessage` in `src/transport/ws/validation.ts`
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes` in `src/types/session.ts`
- [ ] Modify `createMessageHandler` to accept session store and history config; dispatch `list_conversations` off the per-session lock; query store and send `conversation_list` or error frame as specified
- [ ] Add `history?: {enabled: boolean}` to `HalEngineConfig.transport`; thread through `createServer` to `createMessageHandler`
- [ ] Update protocol spec `specs/hal-engine-websocket-protocol/spec.md` with frames and field tables; update conversation list spec with auth and wire format notes
- [ ] Update `example/full-config.ts` and regenerate docs with `npm run docs:fix`

## Out of scope

- A preview or title on summaries (its own issue #???); deleting a conversation from the client; paging state held server-side; an operator view of another user's conversations; live sync between open tabs (#124)