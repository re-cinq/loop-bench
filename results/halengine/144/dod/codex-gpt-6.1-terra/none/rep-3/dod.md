# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and real WebSocket server already expose the request boundary, and the in-memory store supplies real conversation data.

## Done when these pass

- [ ] **validates list requests and their composite cursor** — accepts valid requests and rejects malformed paging fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user, passes paging through and sends wire summaries** — delivers owned metadata and forwards the cursor over a real connection.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports unsupported when history is disabled or the store cannot list** — refuses unavailable history rather than claiming an empty list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add additive wire types and validate the composite cursor and limit.
- [ ] Thread the independent history opt-in and answer from the authenticated user outside the turn lock.
- [ ] Handle unsupported stores and failures safely, and preserve resume and replay behavior.
- [ ] Document the protocol, retention and configuration; update the changelog and minor version.

## Out of scope

- Conversation titles, deletion, operator access, server-side paging state and live sync between sockets.