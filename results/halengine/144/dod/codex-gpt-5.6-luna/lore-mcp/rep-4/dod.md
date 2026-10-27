# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing WebSocket server, connection authentication, message validator, and session store are direct seams. The acceptance tests exercise those real entry points over a real socket and through the exported validator.

## Done when these pass

- [ ] **validates list_conversations limits and its complete before cursor** — accepts the new frame, rejects invalid limits and incomplete or invalid cursors with field-specific errors.
  `src/transport/conversation-list.acceptance.test.ts`
- [ ] **delivers only the authenticated user’s summaries as ISO wire values when history is enabled** — returns the authenticated user’s newest summaries over the socket, with no other user’s rows and ISO timestamps.
  `src/transport/conversation-list.acceptance.test.ts`
- [ ] **answers an error instead of a list when history is not enabled** — keeps the feature opt-in and returns `UNSUPPORTED` without a conversation list.
  `src/transport/conversation-list.acceptance.test.ts`

## Facets

- [ ] Add and validate the additive list-conversations client and server frame types.
- [ ] Route validated list requests through the authenticated WebSocket session and session store.
- [ ] Serialize summaries as protocol-safe ISO strings and enforce ownership from the connection identity.
- [ ] Add the history opt-in and unsupported response path.

## Out of scope

- Store implementations and their paging algorithms, which are covered by the conversation-list store spec.
- Conversation deletion, previews, live synchronization, and a second replay or REST endpoint.