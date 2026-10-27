# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The WebSocket server and frame validator are existing seams. The acceptance tests enter through `validateMessage` and a real upgraded WebSocket backed by the real in-memory session store.

## Done when these pass

- [ ] **validates list_conversations and names every invalid pagination field** — accepts the new request and rejects invalid limit and cursor fields with field-specific errors
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user conversations as ISO summaries when history is enabled** — returns the connection user's newest summaries, including no content, no user-selected identity, and no turn terminal frame
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **refuses the list with UNSUPPORTED when history is not enabled** — keeps the opt-in boundary explicit and never presents an empty list as data
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive request and response protocol types and validator rules.
- [ ] Thread history configuration and the session store through the WebSocket handler.
- [ ] Answer enabled requests off the per-session turn lock and serialize dates for the wire.
- [ ] Return UNSUPPORTED when history is disabled or the store cannot list, while preserving server-error handling for rejected stores.
- [ ] Update protocol/spec/docs/changelog/version surfaces and keep existing message types compatible.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's conversations, and live cross-tab synchronization.