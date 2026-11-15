# Definition of Done

> The client connecting over the WebSocket should be able to request the user's conversation list over the same authenticated connection, without needing a separate HTTP route in the consumer.

**Strategy: `direct`** — The message dispatcher already exists in `createMessageHandler` and the validation switch already routes messages by type; the acceptance seam is already there, and no replacement module is needed.

## Done when these pass

- [ ] **Validation accepts list_conversations with no parameters** — validates that a message of type `list_conversations` with optional `limit` (1-200) and `before` (date cursor) is accepted
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Validation rejects invalid parameters** — validates that limit outside 1-200, fractional, or non-numeric values and before with invalid dates are rejected with field-specific error messages
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler answers UNSUPPORTED when feature is disabled** — validates that `list_conversations` without `history: {enabled: true}` config returns UNSUPPORTED error
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler answers UNSUPPORTED when store has no listFor** — validates that `list_conversations` against a store not implementing `listFor` returns UNSUPPORTED error
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler returns conversation_list with ISO string dates** — validates that when history is enabled and store has `listFor`, the response carries `ConversationSummary` items with `createdAt` and `updatedAt` as ISO strings, not Date objects
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler uses connection userId not frame userId** — validates that a frame carrying a different `userId` is answered with the authenticated user's own list, never a spoofed one
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Parameters reach listFor** — validates that `limit` and `before` from the frame are passed to `store.listFor(userId, {limit, before})`
  `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Answers on non-locked path** — validates that `list_conversations` is answered immediately, not queued behind a streaming `user_message` turn
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` interfaces to `src/types/messages.ts`, additive only
- [ ] Add `ConversationCursor` and `ConversationSummary` interfaces to `src/types/messages.ts`
- [ ] Update `IncomingMessage` union to include `ListConversationsMessage`
- [ ] Update `OutgoingMessage` union to include `ConversationListMessage`
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes` in `src/types/session.ts`
- [ ] Add `validateListConversations` case to `validateMessage` switch in `src/transport/ws/validation.ts`
- [ ] Add handler for `list_conversations` in `createMessageHandler` to answer on non-locked path
- [ ] Integrate session store into message handler and call `listFor` when available
- [ ] Add `history?: {enabled: boolean}` to `transport` config in `src/config.ts`
- [ ] Thread history config through `createServer` to message handler
- [ ] Convert `SessionSummary` dates to ISO strings in response
- [ ] Add regression test: frame with extra `userId` field is answered with connection user's list
- [ ] Log store errors with session id, no user content
- [ ] Handle `StoreCannotList` exception as `UNSUPPORTED`
- [ ] Add spec statements with validation citations to `specs/hal-engine-websocket-protocol/spec.md`
- [ ] Add entry to `CHANGELOG.md` under `## [Unreleased]`
- [ ] Update docs example in `example/full-config.ts` with history config
- [ ] Run `npm run docs:fix` to regenerate docs
- [ ] Bump version MINOR in `package.json`

## Out of scope

- Preview or title on summaries (separate issue)
- Deleting a conversation from client (needs authorization decision)
- Server-side paging state (client pages with `before`)
- Operator view of another user's conversations
- Live sync between open tabs (ruled out in #124)