# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createServer` and the real `ws` client provide the existing transport seam, and `InMemorySessionStore` provides real conversation summaries without a production double.

## Done when these pass

- [ ] **validates list_conversations windows and its composite cursor** — accepts a valid page request and rejects invalid limits and cursors through `validateMessage`.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers only the authenticated user's summaries, newest first, as wire-safe timestamps** — serves the enabled feature over a real WebSocket and proves the frame's user id cannot select another user's data.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses the frame with UNSUPPORTED when history is not enabled** — keeps the feature opt-in and returns an error rather than an empty list.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive list frame types and validation.
- [ ] Thread the session store and history option through the WebSocket handler.
- [ ] Deliver authenticated summaries and unsupported-feature errors over the socket.

## Out of scope

- Store implementation and paging semantics already delivered by #143.
- Conversation deletion, previews or titles, live cross-tab synchronization, and in-band conversation switching.