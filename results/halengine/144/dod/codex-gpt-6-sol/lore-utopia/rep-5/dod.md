# Definition of Done

> #143 gives a consumer `store.listFor(userId)`.
> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public engine factory and a real WebSocket connection provide an existing seam. The shipped in-memory store supplies real conversation summaries, so the client-visible frames can be asserted without a transport double.

## Done when these pass

- [ ] **validates the list frame and its complete paging cursor before dispatch** — accepts a complete cursor and rejects malformed limits or cursors with field-specific errors.
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **sends only the authenticated user’s newest summaries and passes the wire cursor to the store** — answers a request with owned, ordered metadata, forwards paging, and opens a listed id through resume.
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers a disabled or unavailable list with UNSUPPORTED rather than an empty history** — preserves the opt-in and distinguishes an unsupported store from no conversations.
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **answers a list while the same session’s user turn is still running** — history stays responsive while a turn holds the session lock.
      `src/transport/conversationHistory.acceptance.test.ts`

## Facets

- [ ] Add the two protocol frame types, the cursor and summary wire types, and the additive `UNSUPPORTED` error code.
- [ ] Validate limits and both cursor fields independently of the history setting.
- [ ] Thread `transport.history` through the engine and server, then answer lists from `ws.userId` outside the turn lock.
- [ ] Return safe error frames for disabled history, unavailable listing, and store failures without closing the socket.
- [ ] Document the protocol, deployer opt-in and retention decision, update the generated getting-started guide and changelog, and make the minor version bump.

## Out of scope

- Conversation previews, deletion, server-held paging state, operator access to another user's conversations, and live synchronization between tabs.