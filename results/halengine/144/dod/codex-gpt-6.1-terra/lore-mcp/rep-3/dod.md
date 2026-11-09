# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and the real WebSocket server are callable today, with the shipped in-memory store supplying real conversations.

## Done when these pass

- [ ] **validates the list request and its composite cursor** — accepts valid requests and rejects malformed limits and cursors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers only the authenticated user with ordered wire summaries and pages by cursor** — delivers the authenticated user's requested page on the socket, ignoring a forged user id.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list when history is disabled** — the default opt-out returns UNSUPPORTED.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add additive protocol types and static validation for the composite cursor.
- [ ] Thread the independent history option and store into the non-locked message handler, delivering only the authenticated user's summaries.
- [ ] Return UNSUPPORTED for disabled or unavailable listing, and sanitize and log store failures; distinguish StoreCannotList.
- [ ] Exercise streaming concurrency, reconnect and replay, no unsolicited list, full pagination, and legacy type compatibility in the implementation's own tests.
- [ ] Document configuration, privacy and retention, update the changelog and minor version, and regenerate the getting-started example.

## Out of scope

- Conversation titles, deletion, operator access, server-side paging state and live synchronization between tabs.