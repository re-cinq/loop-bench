# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` factory, real WebSocket upgrades, static validator and shipped session stores expose the required behavior today. Five acceptance tests exercise these seams without replacing implementations; the shipped local provider runs the turn, and real Mongo adapters exercise unavailable-list and closed-driver failures without a database service.

## Done when these pass

- [ ] **validates history pagination without changing existing message literals** — Accept the new frame and composite cursor, reject invalid fields and retain existing message compatibility.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated user with ISO metadata and pages into the existing resume path** — Record real store arguments, exclude another user's data, serialize metadata, page and replay a selected conversation.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled or unavailable history with UNSUPPORTED and warns when rows cannot be resumed** — Keep history independently opt-in and report unavailable capability honestly.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **distinguishes a store that cannot list from a failed store without exposing details or closing the socket** — Distinguish unsupported listing from failure, redact errors and log session context.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before stream_end while the same session turn is still running** — Deliver lists outside the session turn lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members without changing existing message contracts; validate the amended composite cursor, not the ticket's superseded timestamp-only cursor.
- [ ] Thread the independent history option from the public factory through the server and handler; default off and warn when enabled without resume.
- [ ] Answer lists from the authenticated socket user, preserve paging arguments, serialize only metadata and reuse existing resume replay.
- [ ] Export StoreCannotList and distinguish unsupported stores from failed stores with sanitised error frames and session-scoped logs.
- [ ] Serve history outside the turn lock without unsolicited lists or extra stream_end frames.
- [ ] Mirror the retention note on the history options type; edit example/full-config.ts and regenerate the getting-started documentation with docs:fix, including the Conversation list section and resume prerequisite.
- [ ] Add a consumer-facing changelog entry and MINOR version bump; state MINOR in the implementation PR and let CI run the full verification and coverage gates.

## Out of scope

- Titles/previews, deletion frames, server-side paging state, operator access, cross-tab live sync and new replay/switch protocols.
- Unrelated uncited statements in the general WebSocket protocol spec; existing store-list guarantees already have tests and citations.
- Source-text assertions for additive diffs, generated docs, release prose or export counts; review and the existing CI gates enforce those obligations.