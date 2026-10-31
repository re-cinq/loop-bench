# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server and frame validator already provide observable seams. The acceptance suite uses a real server, WebSocket clients, and the shipped in-memory store.

## Done when these pass

- [ ] **accepts the list frame only with a bounded integer limit and complete ISO cursor** — validates the client frame and its cursor at the protocol boundary.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers only the connected user's ISO summaries, forwards its cursor, and lets a listed id resume** — lists the authenticated user's conversations on a real socket and reuses the listed id through resume.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a history request with UNSUPPORTED when history is off or the store cannot list** — makes unavailable history distinguishable from an empty list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive protocol payloads, validator, and `UNSUPPORTED` error code.
- [ ] Thread the opt-in history option and session store into the non-locked WebSocket handler.
- [ ] Serialize summaries as ISO wire values and return safe errors for unavailable or failed stores.
- [ ] Document the frames, authenticated ownership rule, retention note, and configuration example.

## Out of scope

- Conversation previews or titles, deletion, operator access to another user's conversations, server-held paging state, and live tab synchronization.