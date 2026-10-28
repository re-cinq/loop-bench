# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` factory, real WebSocket connections and pure `validateMessage` provide the seams. Tests use shipped stores and the shipped local provider; the recording store delegates every read to its real implementation, and the database failure uses a closed real MongoDB client.

## Done when these pass

- [ ] **validates history limits and complete ISO cursors independently of opt-in** — Accept the new frame and reject malformed limits and composite cursors with field-specific errors.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner, pages ties without loss, and reopens a listed conversation** — Deliver metadata only, record ownership and paging arguments, avoid unsolicited frames and stream_end, and use the existing resume path.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers disabled history and a store without listFor with UNSUPPORTED rather than an empty history** — Default off, explicit off and missing capability each return one error while keeping the socket open.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a real turn is held in its lifecycle hook, before stream_end** — History bypasses the per-session turn lock.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **sanitizes a real disconnected database failure and distinguishes a collection without find** — A failed history read returns SERVER_ERROR without database details; a collection lacking find returns UNSUPPORTED, with session-context logging and no user content.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members; retain compatibility of existing message literals and ConnectedMessage.
- [ ] Validate optional integer limits 1–200 and complete ISO-string composite cursors independently of configuration.
- [ ] Thread the separate default-off transport.history option through the public factory and server; mirror the retention note pointing to #41 and warn when history is enabled without resume.
- [ ] Answer history outside the turn lock, using the authenticated user and unchanged paging arguments, serializing metadata dates to ISO strings.
- [ ] Return UNSUPPORTED for disabled history, missing listFor and StoreCannotList; sanitize and log other store failures as SERVER_ERROR while retaining the connection.
- [ ] Keep list responses request-only and use the existing ownership-checked resume and replay path to open a listed conversation.
- [ ] Complete protocol field tables and GDPR explanation; regenerate getting-started from example/full-config.ts with docs:fix, add a consumer changelog entry and a MINOR version bump.
- [ ] Make the five red acceptance tests green and let CI verify types, compatibility, coverage and spec links.

## Out of scope

- Conversation titles or previews, deletion frames, server-side paging state, operator access to another user's history and live synchronization between tabs.
- Changing resume semantics or adding an in-band conversation switch or a REST route.