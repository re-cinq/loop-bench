# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The existing validator and `createHalEngine` WebSocket entry point expose the missing protocol directly. Tests use real sockets, real stores and the existing lifecycle hook to hold an in-flight turn; adapters delegate real storage operations and record the listing arguments.

## Done when these pass

- [ ] **validates history requests and rejects invalid limits and incomplete composite cursors** — `list_conversations` is validated independently of configuration: optional `limit` is an integer from 1 through 200 and optional `before` is a composite cursor containing a parseable date string `updatedAt` and a string `sessionId`; invalid fields are refused with an error naming the field.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **lists only the authenticated owner with wire summaries, forwards paging and resumes a listed conversation** — With `transport.history.enabled`, a request receives exactly one `conversation_list`, containing only the authenticated connection user’s metadata (including the current conversation), newest first, with ISO string times and no content, credentials or `stream_end`; the frame’s `userId` is ignored, and `{limit, before}` is passed unchanged to `listFor` with the connection user id. A listed id can be reopened through the existing resume and replay path.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers disabled history and a store without listing with UNSUPPORTED rather than an empty history** — History is a separate deployer opt-in, off by default: absent or disabled history, and a store without `listFor`, answer one `UNSUPPORTED` error rather than an empty list.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers history before an in-flight turn finishes without entering its session lock** — A history request is answered outside the per-session turn lock, before an in-flight turn finishes.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **contains a real store failure in SERVER_ERROR, logs its session and keeps the socket usable** — A rejected store list answers one sanitised `SERVER_ERROR`, logs the session id without user content or credentials, and leaves the connection usable.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive wire interfaces and union members, preserving existing message literals and `ConnectedMessage`.
- [ ] Validate limits and both halves of the composite cursor independently of configuration.
- [ ] Thread the separate, default-off history option through the engine and server; document retention and warn when resume is off.
- [ ] Dispatch listing outside the turn lock with the authenticated user id and unchanged paging options; serialise metadata times.
- [ ] Return UNSUPPORTED for disabled history, absent listing and StoreCannotList; contain other store errors with sanitised logging and SERVER_ERROR.
- [ ] Preserve the existing ownership-checked reconnect and replay path for listed ids.
- [ ] Finish public documentation through example/full-config.ts and docs:fix, add the consumer changelog and MINOR release metadata, and let CI verify the full gates.

## Out of scope

- Titles or previews, deletion frames, operator access to another user's history, server-side paging state, and live synchronisation across tabs.
- Production implementation in this acceptance-test commit.