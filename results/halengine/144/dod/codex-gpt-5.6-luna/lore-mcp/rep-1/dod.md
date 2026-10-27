# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The WebSocket message handler is the existing seam for dispatching frames, and the session store already exposes the list data. The acceptance tests call that real handler with the real in-memory store and real validation entry point.

## Done when these pass

- [ ] **validates a list frame and its bounded composite cursor** — accepts `list_conversations` and rejects invalid limits and incomplete or invalid cursors.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers the authenticated user list with ISO summaries and forwards paging** — sends the authenticated user’s newest summaries, serializes both times as ISO strings, honors paging, ignores a frame `userId`, and sends no `stream_end`.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **refuses history when disabled or when the store cannot list** — returns one `UNSUPPORTED` error without a list when history is off or `listFor` is unavailable.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive incoming and outgoing protocol types, cursor, and `UNSUPPORTED` error code.
- [ ] Add validation for limits and the composite ISO cursor.
- [ ] Wire the opt-in history handler to the authenticated socket user and session store, outside the turn lock.
- [ ] Cover disabled and unavailable-store failures without fabricating an empty list.

## Out of scope

- Conversation previews, deletion, operator views, live cross-tab synchronization, and any new resume or reconnect protocol.