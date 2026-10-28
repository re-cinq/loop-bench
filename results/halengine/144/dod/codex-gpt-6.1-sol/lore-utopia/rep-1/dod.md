# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real engine factory, validator, stores and WebSocket handshake already expose the required boundary. Tests send frames over real sockets; a recording adapter delegates to the real memory store and a Mongo adapter with an invalid URI supplies a real store rejection without a database fixture.

## Done when these pass

- [ ] **validates history limits and complete composite cursors without accepting a frame user id** — Static validation accepts the additive frame, rejects malformed pagination and drops the supplied identity.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists and pages only the socket owner metadata during a pending turn and resumes a listed conversation** — Enabled history exposes only owned metadata, forwards recorded arguments, preserves composite paging, bypasses the turn lock and uses existing resume replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses history by default, when disabled, and when the store cannot list** — Unsupported deployments report failure rather than an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a real store failure without exposing its detail or closing the socket** — A failed listing reports a sanitized error and logs its session while leaving the connection usable.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and additive unions, preserving existing message literals and ConnectedMessage.
- [ ] Validate optional limits and complete composite cursors independently of feature configuration.
- [ ] Thread the separate default-off history option from the engine factory into the handler; document retention and warn when resume is disabled.
- [ ] Answer owned metadata outside the turn lock, preserving paging arguments and ISO times.
- [ ] Return UNSUPPORTED for disabled or incapable stores, including StoreCannotList; sanitize and log other store failures.
- [ ] Document the frame field tables, metadata disclosure and connection-derived identity; update full-config and regenerate getting-started, add the consumer changelog and minor version bump.

## Out of scope

- Conversation previews or titles, deletion, operator lists, server-held pagination state and live tab synchronization.
- A new replay or in-band conversation-switch path; the acceptance test exercises existing resume.
- Provider output: the pending-turn case pauses at the real orchestrator's beforeModelResponse hook and closes the socket before any provider request.