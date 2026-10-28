# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The pure validator and real `createHalEngine` WebSocket upgrade are existing seams. Tests use real stores, a forwarding recorder, the shipped mock provider and an orchestrator lifecycle hook; no provider or socket doubles are installed.

## Done when these pass

- [ ] **validates history requests and composite cursors independently of configuration** — `list_conversations` is accepted independently of configuration and drops extra fields, including `userId`; optional `limit` is an integer from 1 through 200, and optional `before` is a composite cursor with a parseable date string `updatedAt` and string `sessionId`, with malformed fields refused by name.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **lists only the authenticated user metadata, forwards paging, and opens a listed conversation through resume** — With history enabled, a request returns exactly one `conversation_list` with the authenticated connection user’s summaries in store order, only `sessionId`, ISO string `createdAt`, ISO string `updatedAt` and `entryCount`, forwarding `{limit, before}` to `listFor(ws.userId, options)` and emitting no `stream_end`; a listed id opens through the existing authenticated resume and replay path.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses history with UNSUPPORTED when disabled or the store cannot list, without sending a list** — History is opt-in through `transport.history.enabled`, independently of resume; absent or disabled history, a store without `listFor`, and a Mongo collection adapter without `find` all answer exactly one `UNSUPPORTED` error and no list.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **returns a sanitized SERVER_ERROR and logs the session when a real store fails, keeping the socket usable** — A failing list answers one sanitized `SERVER_ERROR`, keeps the socket usable, and logs the session id without store detail or user content.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers a history request before stream_end while a turn holds the session lock and never pushes a list** — A history request is answered outside the per-session turn lock, before a pending turn’s `stream_end`; lists are sent only on request, and include the current conversation.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members, preserving existing message literals and ConnectedMessage; keep the typed compatibility fixture compiling.
- [ ] Validate limits and composite cursors, ignoring any frame user id.
- [ ] Thread default-off history options through config and server; mirror resume’s retention note pointing to #41 and warn when history is enabled without resume.
- [ ] Deliver authenticated metadata and paging off the turn lock, retaining existing resume replay.
- [ ] Export StoreCannotList for incapable collections, add UNSUPPORTED, sanitize failures and log session context.
- [ ] Update example/full-config.ts and regenerate getting-started with docs:fix; document reconnect and history/resume dependency.
- [ ] Add an installer-facing Unreleased changelog entry and MINOR version bump; finish protocol/docs alignment without changing spec Status here.
- [ ] Run CI verification and maintain coverage floors; PR body identifies MINOR compatibility.

## Out of scope

- Titles, previews, deletion frames, operator access to another user, server-held paging state and live tab synchronization.
- New resume or replay transport paths, HTTP history endpoints, and unrelated uncited legacy protocol requirements.