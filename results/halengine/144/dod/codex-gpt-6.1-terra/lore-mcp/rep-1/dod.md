# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and WebSocket server expose the real protocol boundary, and the in-memory session store supplies real conversation data.

## Done when these pass

- [ ] **validates conversation list requests and their composite cursors** — Validates the request and rejects malformed paging fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers only the authenticated user’s summaries when history is enabled** — Sends only the connection user's metadata as wire summaries.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a conversation list when history is disabled** — Defaults to refusing disclosure with UNSUPPORTED.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive wire types and validate the request and composite cursor.
- [ ] Wire the authenticated user's list through the server, including paging, opt-in, unsupported stores and safe store failure handling.
- [ ] Answer lists outside the session lock and preserve the existing resume and replay path.
- [ ] Document the protocol, retention, configuration, and release changes described in the ticket.
- [ ] Cover remaining error, paging, concurrency and reconnect cases with focused tests.

## Out of scope

- Titles, previews, deletion, cross-user lists, server-side paging state and live tab synchronization.