# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing validator and real WebSocket server expose the protocol boundary. The acceptance tests exercise those entry points with the shipped in-memory store.

## Done when these pass

- [ ] **validates the list request and its composite cursor** — Accept the request and reject invalid limits and cursors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers only the authenticated user with paged wire summaries** — Deliver the authenticated user's requested page as metadata on the wire.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list when history is not enabled** — Return the unsupported error when history is off.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive wire types and validate the composite cursor and limit.
- [ ] Thread the independently opted-in history configuration and store to the handler; use the socket's identity and answer outside the turn lock.
- [ ] Return unsupported for disabled or unavailable listing, and sanitize and log store failures as specified; support reconnect and replay from a listed id.
- [ ] Document the protocol, retention, configuration and startup warning; update changelog and minor version.
- [ ] Verify compatibility, concurrency, store failure handling and spec coverage in the implementation round.

## Out of scope

- Titles, previews, deletion, operator access, server-side paging state and live cross-tab synchronization.