# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real WebSocket server and authenticated connection path already exist. The acceptance tests use that path with the real in-memory session store, plus the existing pure frame validator seam.

## Done when these pass

- [ ] **accepts list_conversations and validates its paging fields** — accepts the new frame and rejects invalid paging values with a field-specific validation error.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers an enabled list with only the authenticated user’s summaries as ISO wire values** — delivers the authenticated user’s summaries over the real WebSocket, excludes another user even when the frame supplies a different `userId`, and serializes both timestamps as ISO strings.
      `src/transport/ws/conversationList.acceptance.test.ts`
- [ ] **answers one disabled history request with UNSUPPORTED and no list** — keeps history opt-in and returns the unsupported error frame when it is not enabled.
      `src/transport/ws/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive client and server conversation-list frame types and the validator’s bounded paging rules.
- [ ] Thread the history option and session store through the real WebSocket handler, using the authenticated socket user and returning ISO summaries.
- [ ] Return `UNSUPPORTED` when history is disabled or cannot be listed, without producing an empty conversation list.

## Out of scope

- Store implementation, preview content, deletion, operator views, live synchronization, and changes to the existing resume protocol.
- Documentation, changelog, package version, and generated getting-started configuration updates beyond the behavior pinned here.