# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` is an existing public seam that accepts real WebSocket upgrades and a real session store, so the protocol can be observed end to end without production changes or network doubles.

## Done when these pass

- [ ] **validates the request and its paging fields at the wire boundary** — accepts the list frame and composite cursor while rejecting every invalid limit or cursor with the field named
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **returns only the authenticated user's newest-first summaries and passes the client's page unchanged** — exposes the enabled wire response, wire-safe summary shape, authenticated ownership, ordering, and paging handoff
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers disabled and unavailable history with UNSUPPORTED rather than an empty list** — keeps disclosure opt-in and distinguishes unsupported history from an empty history
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request while a turn is streaming, without a stream_end of its own** — proves listing bypasses the turn lock and is not treated as a turn
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **sanitizes a store failure, logs its session, and keeps the socket usable** — distinguishes an operational failure from empty history without leaking store detail or closing the connection
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frames, their cursor and summary payloads, and the additive `UNSUPPORTED` error code.
- [ ] Validate `list_conversations` limits and complete ISO-string cursors while discarding any frame-supplied user id.
- [ ] Thread the separate, default-off `transport.history` option and session store into WebSocket handling.
- [ ] Answer enabled lists from `ws.userId` outside the per-session lock, serializing dates and preserving paging options.
- [ ] Map disabled or incapable stores to `UNSUPPORTED`, and sanitized operational failures to `SERVER_ERROR` while keeping the socket open.
- [ ] Document the frames, authorization and retention decision, regenerate the full-config documentation, and add the installer-facing changelog entry.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's conversations, unsolicited cross-tab synchronization, or a new in-band conversation switch.