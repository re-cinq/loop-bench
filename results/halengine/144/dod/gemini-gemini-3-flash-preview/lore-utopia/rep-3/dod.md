# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — The engine already has a WebSocket transport and a session store. The acceptance tests use `createMessageHandler` (with a predicted signature change) to exercise the new protocol frames and authorization rules directly against a mock store and session.

## Done when these pass

- [ ] **Protocol: types and validation - accepts valid list_conversations** — Verifies that `list_conversations` with a valid limit is not rejected by validation.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Protocol: types and validation - rejects invalid limit (0)** — Verifies that `limit: 0` is rejected with `INVALID_MESSAGE`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Protocol: types and validation - rejects invalid limit (201)** — Verifies that `limit: 201` is rejected with `INVALID_MESSAGE`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Protocol: types and validation - rejects malformed cursor (missing sessionId)** — Verifies that a `before` cursor missing `sessionId` is rejected.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler: delivers conversation list - returns summaries with ISO strings** — Verifies that `list_conversations` returns a `conversation_list` with summaries where dates are ISO strings.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler: respects authentication - uses ws.userId, not frame userId** — Verifies that the user ID for the list is taken from the connection, not the message.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler: opt-in - returns UNSUPPORTED when history is disabled** — Verifies that the feature is off by default and returns `UNSUPPORTED`.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler: unsupported store - returns UNSUPPORTED when store lacks listFor** — Verifies that a store without `listFor` results in an `UNSUPPORTED` error.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Handler: non-blocking - answers list_conversations while user_message is streaming** — Verifies that history requests do not queue behind the per-session lock.
      `src/transport/ws/conversationList.acceptance.test.ts`

- [ ] **Integration: session resume - reconnecting with an id from the list receives resumed: true and replay** — Verifies that the `sessionId` from a list can be used to resume a session.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add `ListConversationsMessage` and `ConversationListMessage` to `src/types/messages.ts`.
- [ ] Add `list_conversations` validation to `src/transport/ws/validation.ts`.
- [ ] Implement `list_conversations` handling in `src/transport/ws/messageHandler.ts` (unlocked).
- [ ] Thread `history` config from `HalEngineConfig` to the handler.
- [ ] Add `UNSUPPORTED` to `ErrorCodes` and handle store/config unavailability.
- [ ] Update documentation and specifications.

## Out of scope

- Preview or title on summaries.
- Deleting conversations.
- Server-side paging state.
- Operator view of other users.
- Live sync between tabs.