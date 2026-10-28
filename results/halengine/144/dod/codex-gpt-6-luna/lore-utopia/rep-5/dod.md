# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` is the real WebSocket entry point, and a real socket can send the frame today. The acceptance tests assert the server’s response through that path.

## Done when these pass

- [ ] **Returns only the authenticated user’s summaries as wire-safe dates when asked** — a real WebSocket request returns the connected user’s ordered summaries with ISO timestamps and does not accept another user id from the frame.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **Accepts a composite paging cursor and names invalid list fields** — validation accepts a valid cursor and rejects out-of-range limits, malformed dates and incomplete cursors with field-specific errors.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **Reports that listing is unsupported while history is disabled** — a real WebSocket request gets an `UNSUPPORTED` error instead of a list.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Validate and type the list request and response frames.
- [ ] Handle enabled list requests through the connection’s authenticated user and serialize summary dates for the wire.
- [ ] Return `UNSUPPORTED` when history is disabled or the store cannot list.
- [ ] Document the WebSocket list request, response and authorization rule in the specs.

## Out of scope

- Adding a REST conversation-list endpoint, conversation previews, deletion, server-held paging state or live sync between tabs.