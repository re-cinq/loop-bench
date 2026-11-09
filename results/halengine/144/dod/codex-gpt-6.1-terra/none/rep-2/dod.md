# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and a real WebSocket server expose the protocol boundary already. The acceptance tests send requests through those entry points using the real in-memory store.

## Done when these pass

- [ ] **validates list requests and their composite cursor independently of configuration** — Accept valid requests and reject malformed limits and cursors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers the authenticated user with wire summaries and pages using the supplied cursor** — Return only the authenticated user's paged metadata in wire form.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports unsupported when history is disabled or the store cannot list** — Refuse unavailable history without reporting an empty list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add additive protocol types, cursor validation and the independent history option.
- [ ] Answer from the authenticated user's store with paging, ISO summaries and no unsolicited frames; keep listing outside the turn lock.
- [ ] Handle unsupported stores and store failures safely, including StoreCannotList, and preserve resume and replay.
- [ ] Document privacy, retention, configuration and reconnect; update the changelog and minor version.

## Out of scope

- Conversation titles, deletion, operator views and live synchronization between tabs.