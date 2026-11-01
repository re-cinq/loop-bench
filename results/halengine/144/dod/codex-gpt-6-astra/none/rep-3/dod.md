# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and `createHalEngine` already provide real entry points. Three acceptance scenarios exercise real WebSockets, the shipped in-memory store and MongoDB adapter, with a closed driver client for failure and delegating adapters for legacy capabilities; no production implementation is changed.

## Done when these pass

- [ ] **validates history frames and composite cursors without changing existing frames** — Valid limits and composite cursors are accepted, malformed fields are named, and existing protocol literals remain compatible.
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **lists only the connected user on demand, pages ties, bypasses turns and resumes a listed conversation** — The public configuration reaches the handler, ownership and paging arguments are recorded while delegating to the real store, metadata is serialized without content, a running turn does not block a list, and a listed id replays through resume.
      `src/transport/conversationHistory.acceptance.test.ts`
- [ ] **reports unavailable history explicitly and contains store failures without closing the socket** — Default-off, explicit-off and missing store/collection capabilities produce UNSUPPORTED; a database failure produces a sanitized SERVER_ERROR with a session-scoped log, keeps the connection usable, and history without resume warns.
      `src/transport/conversationHistory.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members, composite-cursor validation, and the UNSUPPORTED error code without changing existing message contracts.
- [ ] Thread the independent default-off history option from createHalEngine through createServer; dispatch history outside the turn lock using ws.userId and the frame's paging options.
- [ ] Serialize only summary metadata, including the current conversation; preserve tied rows across pages and reuse the existing resume/replay path.
- [ ] Export StoreCannotList for missing collection capability; distinguish unsupported history from sanitized, logged store failures without ending a turn or closing the socket.
- [ ] Warn about history enabled without resume; document the deployer's disclosure decision and retention responsibility (#41) on the new options type.
- [ ] Add Conversation list guidance through example/full-config.ts and regenerate docs with npm run docs:fix; add the consumer changelog entry and MINOR bump, with the PR description naming the version policy.
- [ ] Keep spec links anchored and let CI verify types, documentation, coverage and the remaining repository gates; leave spec Status rows unchanged in this acceptance-only commit.

## Out of scope

- Titles/previews, deletion, server-held paging state, operator access to other users, live synchronization, and an in-band conversation switch.
- Re-testing already linked store requirements from #143 or unrelated unlinked requirements in the general WebSocket spec.
- Production changes in this commit. The shipped mock provider runs as configured through the real factory/orchestrator; no provider, socket or store method is replaced with a test double. The afterModelResponse hook holds the real turn open deterministically.