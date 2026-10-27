# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so

**Strategy: `direct`** — `createMessageHandler` is the real WebSocket message entry point and can be exercised with an authenticated socket and the real in-memory session store.

## Done when these pass

- [ ] **answers an authenticated user with their own summaries and no conversation content** — a list request over the socket returns only that authenticated user's summary rows, with wire-safe timestamps and no entry contents.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Accept `list_conversations` at the WebSocket boundary and answer through the authenticated connection.
- [ ] Keep the response scoped to the connection user and serialize summary timestamps for the wire.

## Out of scope

- The existing store-level ordering and paging behavior, which is covered by the conversation-list spec.
- In-band conversation switching or unsolicited list updates.