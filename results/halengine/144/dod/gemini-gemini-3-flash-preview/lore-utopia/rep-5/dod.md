# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — A seam exists in `validateMessage` and `createMessageHandler` (via the `handle` function returned by it). The acceptance tests will call these entry points directly with real values to fail on missing behavior.

## Done when these pass

- [ ] **protocol message types** — `IncomingMessage` accepts `list_conversations` and `OutgoingMessage` includes `conversation_list` with summary payload types.
      `src/types/messages.acceptance.test.ts`
- [ ] **frame validation** — `validateMessage` accepts `list_conversations` and enforces `limit` (1-200) and cursor `before` (composite `updatedAt`/`sessionId`) constraints.
      `src/transport/ws/validation.acceptance.test.ts`
- [ ] **list handler logic** — `createMessageHandler` answers `list_conversations` with the authenticated user's list from the store, newest first, with ISO timestamps, only when enabled.
      `src/transport/ws/messageHandler.acceptance.test.ts`
- [ ] **unsupported/missing listFor** — `list_conversations` is answered with `UNSUPPORTED` when history is disabled or the store lacks `listFor`.
      `src/transport/ws/messageHandler.acceptance.test.ts`
- [ ] **lock-free handling** — `list_conversations` is answered while a `user_message` turn is still streaming on the same session.
      `src/transport/ws/messageHandler.acceptance.test.ts`

## Facets

- [ ] Add `list_conversations` and `conversation_list` frames to protocol types
- [ ] Add `UNSUPPORTED` error code to `ErrorCodes`
- [ ] Implement `list_conversations` validation logic
- [ ] Thread history configuration through `createMessageHandler`
- [ ] Implement `list_conversations` handling logic using `ws.userId` and store's `listFor`
- [ ] Ensure `list_conversations` bypasses the `PerSessionLock`

## Out of scope

- Preview or title on conversation summaries
- Deleting conversations from the client
- Server-side paging state
- Operator view of other users' conversations
- Live sync between open tabs