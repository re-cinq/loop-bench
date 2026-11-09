# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing validator and `createServer` expose the protocol through real calls and WebSocket connections. The acceptance tests use the shipped in-memory store and authenticated upgrades.

## Done when these pass

- [ ] **validates list requests and their composite paging cursor** — Accept valid list requests and reject invalid limits and cursors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers with the authenticated user’s paged summaries over the socket** — Deliver the authenticated user's paged metadata on demand, including ISO timestamps, without trusting a frame's user id.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list when history is not enabled** — Answer an opt-out with `UNSUPPORTED`.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add additive wire types and static validation for the composite cursor and limits.
- [ ] Thread the independent history option through the server and answer lists outside the turn lock using the connection's user id.
- [ ] Handle missing listing support and store failures with the specified sanitized errors and logging.
- [ ] Verify paging, concurrent streaming, and reconnect replay, including ownership and stores that cannot list.
- [ ] Update the conversation-list and protocol specs, generated getting-started documentation, changelog and minor version.

## Out of scope

- Conversation titles, deletion, server-side paging state, operator access and live synchronization between tabs.