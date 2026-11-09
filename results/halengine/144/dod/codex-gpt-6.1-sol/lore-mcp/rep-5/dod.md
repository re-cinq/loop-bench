# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real `createHalEngine` entry point authenticates real WebSocket connections and already owns the session store. Tests use the shipped provider and real stores, a recording subclass that delegates to the store, and a revoked native capability to exercise failure without replacing store results.

## Done when these pass

- [ ] **validates history limits and composite cursors independently of configuration** — Accept the additive request and validate limits and both cursor halves.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **lists only the authenticated owner and pages wire summaries into the existing resume path** — Deliver only the owner’s metadata, forward paging arguments, and reopen a listed conversation.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **reports unsupported history for an absent or disabled opt-in and for a legacy store** — Refuse unavailable history explicitly without querying or returning an empty list.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **keeps a history request outside the active turn lock** — Answer history before an active turn finishes.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers a real store access failure with a sanitized error and keeps the socket usable** — Contain store failures with a sanitized error, session-scoped logging and a usable socket.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and additive union members, preserving existing message literals and ConnectedMessage.
- [ ] Validate optional limits and composite cursors, ignoring frame-supplied user ids.
- [ ] Thread the separate default-off history option from configuration through the server and dispatch outside the turn lock.
- [ ] Serialize owner-only metadata and forward paging options unchanged; retain the existing resume path.
- [ ] Return UNSUPPORTED for disabled or incapable stores, including the exported StoreCannotList capability error; sanitize and log operational failures.
- [ ] Complete protocol field tables and GDPR/retention documentation, regenerate getting-started from example/full-config.ts, warn for history without resume, and add a consumer changelog entry with a MINOR release bump.

## Out of scope

- Conversation titles or previews, deletion, operator access to another user, server-side paging state, unsolicited history pushes, live tab synchronization, and a new replay or in-band switch path.
- Existing store-list behavior and unrelated uncited requirements in the broad WebSocket protocol specification.