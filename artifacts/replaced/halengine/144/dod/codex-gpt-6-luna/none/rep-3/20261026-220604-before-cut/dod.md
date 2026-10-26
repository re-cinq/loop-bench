# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server and `InMemorySessionStore` provide an end-to-end seam. The acceptance test sends the protocol frame over an authenticated socket and checks the returned summaries and ownership.

## Done when these pass

- [ ] **Conversation list over the WebSocket protocol** — An enabled history request returns the authenticated user's own conversation summaries with ISO timestamp strings, even if the frame carries another user's id.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the authenticated WebSocket request and response for conversation summaries.
- [ ] Keep list ownership bound to the authenticated connection when the frame contains an extra user id.

## Out of scope

- Paging validation, disabled-history errors, and store failure handling beyond the socket's successful list response.
- Reconnecting to a selected conversation, which the existing resume path covers.