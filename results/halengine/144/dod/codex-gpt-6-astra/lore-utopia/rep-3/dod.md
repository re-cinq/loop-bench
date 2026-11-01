# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createHalEngine` are existing entry points; real WebSocket connections exercise configuration, authentication, handling and replay with real stores. A lifecycle hook holds a real turn before model I/O; store instrumentation delegates to the actual implementation, and a closed Mongo client supplies a real failure without a database service or test double.

## Done when these pass

- [ ] **validates history frames and composite cursors without accepting malformed paging fields** — static validation accepts the amended frame and rejects bad paging fields, excluding a frame-supplied identity.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner, pages ties, resumes a listed row and bypasses a running turn** — the public configuration enables exactly one metadata-only response, preserves store arguments, supports tie-safe paging and existing resume, and bypasses the turn lock.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses unavailable history and sanitizes real store failures while keeping the socket usable** — default/explicit opt-out, absent listing capability and missing collection find return UNSUPPORTED; a real store rejection returns SERVER_ERROR with safe logs and an open socket.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members additively, preserving existing message literals and ConnectedMessage; implement static cursor and limit validation.
- [ ] Thread the independent history opt-in from HalEngineConfig through createServer to the non-locked handler; take identity only from the authenticated connection and serialize metadata dates.
- [ ] Pass both paging options unchanged and preserve ordering, tie-breaks, current-session visibility and the existing resume/replay path.
- [ ] Distinguish unavailable history (including exported StoreCannotList) from store failure, sanitize the error and log the session id without user content.
- [ ] Warn on history enabled without resume; document that deployment constraint and mirror the retention note pointing to #41 on the new options type.
- [ ] Complete consumer documentation through example/full-config.ts and docs:fix, add the Unreleased changelog entry, and deliver a MINOR release without a migration guide.
- [ ] Keep the spec citations aligned; CI verifies compatibility, docs, coverage and build requirements without changing spec Status rows in this acceptance-only commit.

## Out of scope

- Titles/previews, deletion, operator access, server-held paging state, in-band conversation switching and cross-tab live sync.
- Store listing semantics already covered by #143; unrelated uncited WebSocket protocol statements.
- Production implementation and tests of repository prose/source text. The existing Lore Jest descriptor command emits only id/name/file, with no spec metadata facility; tests carry spec comments and statement-side named citations without modifying that production tooling here.