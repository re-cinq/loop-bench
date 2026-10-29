# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `createHalEngine` already exposes the authenticated WebSocket and an optional store `listFor` seam. The new tests send real frames through that path and observe wire replies and store arguments.

## Done when these pass

- [ ] **accepts a list request and rejects malformed limits and composite cursors** — the validator accepts the new frame and refuses malformed pagination.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the connected owner’s rows in newest-first order, pages with the wire cursor, and resumes a selected row** — the engine returns wire-safe metadata for the authenticated user, passes the cursor through, and retains the existing resume path.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers disabled or unavailable history with UNSUPPORTED and a store failure with a safe SERVER_ERROR** — absence and failure cannot be mistaken for an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request while a turn is streaming, before its stream_end** — listing does not wait for the turn lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol types and `UNSUPPORTED` code, preserving existing message shapes.
- [ ] Validate the optional integer limit and complete ISO cursor independently of feature configuration.
- [ ] Thread the separate history opt-in through `HalEngineConfig` and `createServer`; answer through the authenticated socket user and optional `listFor` outside the turn lock.
- [ ] Return safe error frames for disabled history, missing `listFor`, `StoreCannotList`, and rejected stores; keep the socket open and log the failure with session id only.
- [ ] Document the authorization and retention decision, regenerate the getting-started config block from `example/full-config.ts`, and add the Unreleased changelog entry and minor version bump.
- [ ] Run CI's spec, documentation, coverage, and build gates after implementation.

## Out of scope

- Conversation previews or titles, client deletion, operator access to another user's history, server-held paging state, and live synchronization between tabs.