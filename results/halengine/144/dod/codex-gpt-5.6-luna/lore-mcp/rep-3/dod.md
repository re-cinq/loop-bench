# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store

**Strategy: `direct`** — The real WebSocket server and message validator are already callable through `createServer` and `validateMessage`. The acceptance tests use a live WebSocket connection backed by the in-memory session store, so the missing protocol behavior is observable without a double.

## Done when these pass

- [ ] **validates a list_conversations frame and its paging fields** — accepts the new frame and rejects invalid `limit` and `before` values with field-specific errors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the authenticated user with their summaries and forwards the user id to listFor** — an enabled history request returns ISO-dated summaries for only the connected user, and the store receives the connection user rather than a frame-supplied id.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a conversation list when history is not enabled** — the default configuration answers with `UNSUPPORTED` and never sends a conversation list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive inbound frame and validation rules.
- [ ] Thread history configuration and the session store into the WebSocket handler.
- [ ] Answer enabled requests with authenticated summaries and ISO wire timestamps.
- [ ] Return `UNSUPPORTED` when history is disabled or the store cannot list.

## Out of scope

- Conversation deletion, previews or titles, server-held paging state, operator views, and live cross-tab synchronization.
- REST endpoints or a new in-band conversation-switch/replay path.