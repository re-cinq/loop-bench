# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server and message validator are existing seams. The acceptance suite connects a real client to the server with the shipped in-memory store, so the missing protocol behaviour is observable without doubles.

## Done when these pass

- [ ] **validates a list request and its bounded composite cursor** — the new client frame accepts only the specified limit and complete, usable cursor.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers an enabled request with only the authenticated user's newest summaries on the wire** — an opted-in real socket receives ISO-encoded summaries for its authenticated owner, ignoring an injected user id.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list request unless the deployer opted in** — history disclosure defaults off and is reported as unsupported rather than as an empty list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the list request, cursor, summary, response, and `UNSUPPORTED` protocol types without changing existing frames.
- [ ] Validate the optional limit and both halves of the ISO-string cursor.
- [ ] Thread the opt-in history configuration and store into the WebSocket handler.
- [ ] Answer list requests outside the per-session turn lock using only the connection's authenticated user id.
- [ ] Report disabled or unavailable listing as `UNSUPPORTED`, and sanitize unexpected store failures as `SERVER_ERROR`.
- [ ] Document the protocol, GDPR boundary, configuration, changelog, and MINOR release surface required by the ticket.

## Out of scope

- Conversation previews or titles, deletion, server-held paging state, operator access to another user's history, and live synchronization between tabs.