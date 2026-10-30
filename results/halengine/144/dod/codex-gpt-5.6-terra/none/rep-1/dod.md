# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing WebSocket server, frame validator, and in-memory session store provide real entry points for the protocol contract. The acceptance suite uses a live socket and the configured engine rather than transport doubles.

## Done when these pass

- [ ] **conversation-list WebSocket acceptance** — validates list frames, delivers the authenticated user's paged ISO summaries, and refuses disabled or unavailable history without pretending it is empty.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list request and response protocol types, validator, and `UNSUPPORTED` error code.
- [ ] Thread the opt-in history setting and store through the WebSocket handler; answer lists outside the turn lock using `ws.userId`.
- [ ] Serialize summary dates for the wire; preserve cursor paging and map unavailable or failed stores to safe error frames.
- [ ] Document the frames, authorization, opt-in disclosure, retention note, config example, changelog, and minor release metadata.

## Out of scope

- Conversation previews, deletion, server-held paging state, another user's conversations, and live history synchronization.