# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The static validator and `createHalEngine` are existing entry points. Acceptance tests use real WebSocket connections, the in-memory store, and delegating adapters; a closed Mongo client exercises actual query failure without a database daemon, and a consumer policy holds a real orchestrator turn without invoking an external model.

## Done when these pass

- [ ] **validates history limits and composite cursors independently of configuration** — Accept the new frame and reject malformed limits or incomplete/unusable cursors with field-specific diagnostics.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated users metadata, pages ties and reopens a listed conversation** — Authenticate once, ignore frame-supplied identity, record the actual store arguments, return ISO metadata without content, page tied activity, include the current session, and resume a selected row with its replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses unavailable history and sanitizes store failures without closing the socket** — Default-off and explicitly disabled history, absent listFor and absent collection find produce UNSUPPORTED; actual query failure produces SERVER_ERROR, safe logging and a still-responsive socket.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a user turn holds the session lock** — A pending real orchestrator turn cannot delay a history reply or add stream_end to it.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and additive union members, preserve existing frame literals and ConnectedMessage, and validate bounded limits and composite cursors.
- [ ] Thread independent default-off transport.history through the public factory and server into the handler; derive identity from ws.userId and pass both paging options unchanged.
- [ ] Serialize summaries only, answer off the turn lock, and retain the existing resume/replay route and ownership check.
- [ ] Add UNSUPPORTED and exported StoreCannotList, distinguish unavailable listing from query failures, sanitize errors and logs, and keep the socket usable.
- [ ] Warn at startup when history is enabled without resume; document the configuration dependency and mirror the retention note from SessionResumeOptions.
- [ ] Update example/full-config.ts and regenerate getting-started with docs:fix, add an installer-facing Unreleased changelog entry, and use a MINOR release; keep the spec citations anchored without changing Status during this acceptance-only round.

## Out of scope

- Titles/previews, client deletion, operator access, server-side paging state, tab fan-out and in-band conversation switching.
- New store ordering behavior (#143 already provides it) and unrelated uncited WebSocket requirements.
- Source-text assertions for documentation, versioning or additive edits; these remain explicit review facets, with compilation and repository gates owned by CI.