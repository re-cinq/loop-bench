# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — Exercise the existing validator and public engine factory with real WebSocket upgrades and the real in-memory store. Record list arguments while delegating to the actual store; hold a turn at the supported lifecycle hook to observe lock independence without calling a model.

## Done when these pass

- [ ] **validates conversation-list limits and complete ISO cursors without accepting a frame user id** — Static frame validation accepts the additive message and rejects malformed paging fields.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner with wire summaries, pages tied rows and resumes a selected conversation during a pending turn** — Public config reaches the handler, metadata is serialized without content, ownership comes from the connection, paging arguments reach the store unchanged, and listing bypasses the turn lock.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers disabled history and a legacy store without listFor with UNSUPPORTED and keeps the socket usable** — Default off, explicit off, and missing capability produce errors rather than misleading empty data.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **sanitizes a rejected store list into SERVER_ERROR and logs only safe session context** — A real Mongo store with invalid connection configuration rejects its list; the transport protects store details and remains usable.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add additive wire types, composite cursor validation and UNSUPPORTED.
- [ ] Thread independent transport.history opt-in through the factory and server.
- [ ] Dispatch authenticated list requests outside the turn lock; serialize summaries and preserve paging arguments.
- [ ] Handle missing capability and store failures safely, including StoreCannotList, sanitized SERVER_ERROR and session-scoped logging.
- [ ] Document frames, ownership, retention and resume dependency; regenerate the full-config documentation and add the minor-release changelog entry.

## Out of scope

- Titles, previews, deletion, operator access, server-held paging state and cross-tab live sync.
- Reimplementing store ordering or the existing session resume/replay transport.