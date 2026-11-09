# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real validator and `createHalEngine` WebSocket path already exist. Tests exercise actual sockets and store operations; recording/delegating adapters preserve the real queries, and a consumer hook holds the real orchestrator's turn lock without a model call.

## Done when these pass

- [ ] **validates list requests and composite cursors without accepting an identity from the frame** — `list_conversations` validates independently of configuration: optional `limit` is an integer from 1 through 200, optional `before` contains both a parseable string `updatedAt` and string `sessionId`, malformed fields are named in validation errors, and extra identity fields are discarded.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **lists only the authenticated users metadata, pages ties and resumes a listed conversation** — With history enabled, a request returns exactly one `conversation_list` with only the authenticated connection owner’s metadata, newest first including the current session, ISO timestamps and no `stream_end`; `listFor` receives that owner and the unchanged `{limit, before}` options, composite paging preserves ties, and a listed id reconnects through the existing resume and replay path.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses disabled history and stores without listing with UNSUPPORTED and no list** — History is independently opt-in through `transport.history.enabled`, default off even when resume is enabled, and disabled history or a store without `listFor` returns one `UNSUPPORTED` error without querying or sending a list.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **distinguishes a store failure from an unsupported collection without leaking details or closing the socket** — A failed listing returns one sanitised `SERVER_ERROR`, logs the session id without user content and leaves the socket usable, while a Mongo collection without `find` returns `UNSUPPORTED` rather than an empty history.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers history while a real user turn holds the session lock** — A history request is answered outside the session turn lock, before a pending user turn ends.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members, preserve existing message literals and ConnectedMessage, and validate the amended composite cursor.
- [ ] Thread the independent default-off history option through config and server; document retention (#41) and warn when history is enabled without resume.
- [ ] Answer authenticated metadata requests outside the turn lock, forwarding paging unchanged and preserving the existing resume path.
- [ ] Return UNSUPPORTED for disabled/missing capabilities including exported StoreCannotList, and sanitise/log genuine failures as SERVER_ERROR without closing the socket.
- [ ] Add the consumer changelog and MINOR version bump; document conversation lists in example/full-config.ts and regenerate the getting-started block with docs:fix.
- [ ] Preserve spec status rows until implementation review; CI checks types, compatibility, coverage, docs, spec links and the full suite.

## Out of scope

- Titles/previews, deletion, operator access, server-held paging state and live tab synchronisation.
- Provider response generation: the lock test holds a turn through a real consumer hook before model I/O; it does not simulate model output.
- Store query semantics already covered by #143; the added tests cover the transport boundary.