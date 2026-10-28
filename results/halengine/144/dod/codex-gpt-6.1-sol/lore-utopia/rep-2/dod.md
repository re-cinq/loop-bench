# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The pure validator and `createHalEngine` already provide real entry points; the tests use authenticated WebSocket connections and shipped stores. Recording delegates preserve real store behavior, and capability/failure cases delegate listing to real Mongo stores without a database process or test doubles.

## Done when these pass

- [ ] **validates bounded list requests and complete composite cursors independently of configuration** — Accept the additive frame and validate the amended composite cursor and integer limit, ignoring a supplied user id.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner, pages tied activity without gaps, and reopens a listed conversation** — Deliver exactly one metadata-only response, record the authenticated store argument and unchanged paging options, include the current conversation, never push history, and reuse resume/replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports unsupported capabilities and private store failures as errors while keeping the socket usable** — Default-off, explicitly disabled, missing listFor and Mongo's missing find are UNSUPPORTED; an actual closed-driver failure is a sanitized SERVER_ERROR logged with the session id, and ping still works.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request before the active user turn can finish** — Answer outside the per-session lock with no stream_end; a real lifecycle hook holds the user turn before provider work, then socket cancellation releases it without contacting a cloud service.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive wire interfaces and union members, retain all existing message literals and ConnectedMessage, and add UNSUPPORTED.
- [ ] Validate the amended `{updatedAt, sessionId}` cursor and limit statically, including field-specific INVALID_MESSAGE responses.
- [ ] Thread default-off transport.history through createHalEngine and createServer into the non-locked handler; list only ws.userId and preserve paging arguments.
- [ ] Distinguish missing listFor and exported StoreCannotList from transient failures; sanitize client errors and log failures with session id and no user content.
- [ ] Keep history request-only, include the current session, and reuse the existing owned-session resume and replay path.
- [ ] Add the startup warning for history without resume and mirror the options retention note pointing at #41.
- [ ] Finish the protocol field tables and GDPR explanation; update example/full-config.ts and regenerate getting-started with npm run docs:fix.
- [ ] Add the consumer-facing Unreleased entry, MINOR version bump and PR explanation; preserve existing spec Status rows until implementation is reviewed and let CI run the required checks and coverage floors.

## Out of scope

- Titles or previews, client deletion, server-held paging state, operator access, and live sync across tabs.
- New REST routes, in-band conversation switching, a second replay path, or changes to store ordering and retention policy.
- Source-text assertions for documentation, additive-only diffs, versioning or grep criteria; those are review/CI obligations above, not runtime behavior.