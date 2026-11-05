# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The pure validator and `createHalEngine` expose the real entry points. Real sockets, real in-memory and Mongo store operations, a recording subclass that delegates every list, and a lifecycle hook holding a real turn exercise the boundary without replacing production behavior.

## Done when these pass

- [ ] **validates history limits and complete ISO cursors independently of configuration** — Accept the new frame and reject malformed fields by name.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated users metadata, pages ties and resumes a listed conversation** — Thread the config, use the authenticated id (including the recorded store argument), serialize only metadata, forward paging and reuse resume.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is absent, disabled or the store cannot list** — Distinguish unavailable history from an empty history, including a collection without find.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a real store failure without leaking details or closing the socket** — Sanitize a genuine Mongo adapter failure and retain a usable socket.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a real turn holds the session lock** — Answer before the pending turn ends; no external model request is needed.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four public protocol interfaces and union members, keeping old message literals valid and ConnectedMessage unchanged; add static cursor and limit validation.
- [ ] Thread the independently default-off history option through the factory and server; warn when history is enabled without resume and mirror the retention note pointing at #41.
- [ ] Dispatch outside the turn lock using ws.userId, return only ISO metadata when asked, and forward both paging options unchanged.
- [ ] Export StoreCannotList and map unavailable capability to UNSUPPORTED; map other failures to sanitized SERVER_ERROR and log the session id without user content.
- [ ] Preserve reconnect/replay and document opening a listed id with resume enabled.
- [ ] Update example/full-config.ts and regenerate getting-started with docs:fix; add the consumer changelog and MINOR version bump, and preserve the new spec citations.

## Out of scope

- Titles, previews, client erasure, an operator view, server-held paging state, live synchronization and a second replay path.
- Unrelated unlinked statements in the broad WebSocket protocol specification; the conversation-list store contract already has citations throughout.
- Source-text assertions about additive diffs or documentation; those are reviewed as implementation facets, with CI checking compilation and generated docs.
- The existing Lore list adapter emits only id/name/file, not spec descriptors. Test comments stamp their spec anchors and statements link directly to the executable tests; changing that adapter is separate tooling work.