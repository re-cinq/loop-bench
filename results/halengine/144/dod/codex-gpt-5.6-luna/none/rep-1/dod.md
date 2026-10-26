# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing `createServer` WebSocket upgrade and `createMessageHandler` path are the seam. The acceptance tests exercise validation and a real socket backed by the in-memory session store.

## Done when these pass

- [ ] **accepts a composite cursor and rejects invalid limits or partial cursors by naming the field** — validates the client frame and amended `{updatedAt, sessionId}` cursor contract.
  `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **lists only the connected user’s summaries, serializes dates, and forwards paging without stream_end** — delivers the authenticated user’s list over the enabled WebSocket history feature and forwards `limit`/`before` to the store.
  `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list frame types and validator rules.
- [ ] Thread history options and the session store through the WebSocket handler.
- [ ] Answer enabled list requests with authenticated summaries and unsupported/error paths.
- [ ] Keep list requests outside the per-session turn lock.
- [ ] Update the protocol specification and citations.

## Out of scope

- Conversation deletion, previews or titles, operator access to another user’s history, live tab synchronization, and a new in-band conversation switch frame.