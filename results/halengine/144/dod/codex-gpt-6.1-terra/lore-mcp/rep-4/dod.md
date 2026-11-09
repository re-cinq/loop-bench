# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and real WebSocket server already provide entry points, and the in-memory store supplies real conversation data. The tests exercise those entry points without replacing production dependencies.

## Done when these pass

- [ ] **validates the list frame and its composite cursor independently of configuration** — Accept the frame and reject invalid limits and cursors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers only the authenticated user with wire summaries and passes the requested page to the store** — Return the user's ordered metadata and forward paging without trusting a frame's user id.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses a list when history is disabled** — Return `UNSUPPORTED` instead of a list when not enabled.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **reports unavailable and failing stores without presenting an empty history** — Report unavailable and failed stores without exposing their details.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive protocol types, cursor validation and error code without changing existing message shapes.
- [ ] Thread the separate default-off history option through the server and answer from the authenticated user's store, outside the session lock.
- [ ] Handle missing list support and `StoreCannotList` as `UNSUPPORTED`, and other failures as sanitized `SERVER_ERROR` with safe logging.
- [ ] Verify listing during streaming and reconnecting to a listed conversation through the existing resume path.
- [ ] Document the protocol, privacy and retention decision, configuration and resume dependency; update the generated getting-started example, changelog and minor version.

## Out of scope

- Conversation titles, client deletion, server-side paging state, other users' history and live synchronization between tabs.