# Definition of Done

> Deliver a user's conversation list over the WebSocket protocol

**Strategy: `direct`** — `createServer` accepts real WebSocket upgrades and already owns both the authenticated socket and session store. The acceptance tests exercise that entry point with a real in-memory store and live WebSocket client.

## Done when these pass

- [ ] **delivers the authenticated user's paged summaries as ISO wire values, ignoring a supplied userId** — an enabled WebSocket history request returns only the connected user's paged summaries and forwards its cursor to the store.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **validates list_conversations pagination fields before dispatching it** — the protocol accepts the valid list frame and rejects invalid limits or cursors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses conversation lists when history is not enabled** — history remains opt-in and reports `UNSUPPORTED` while disabled.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list frame types and validator, including the ISO cursor payload.
- [ ] Route enabled requests outside the turn lock using `ws.userId`, and translate summaries to wire values.
- [ ] Thread the independent history option through server configuration and return `UNSUPPORTED` when it is unavailable.

## Out of scope

- Conversation previews, deletion, server-held paging state, operator access to another user's history, and cross-tab live synchronization.