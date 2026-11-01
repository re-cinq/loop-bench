# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public engine factory, real WebSocket server and static validator are callable today. Four acceptance cases exercise real stores and sockets; recording delegates retain the store implementation, and a closed Mongo client supplies a real failure without a database service or test double.

## Done when these pass

- [ ] **validates history limits and complete wire cursors without a feature flag** — Accept the new frame and reject malformed paging fields without breaking existing input frames.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists and pages only the socket owner during a pending turn and resumes a listed conversation** — Deliver metadata only, enforce connection ownership, preserve composite paging, bypass the turn lock and reuse resume/replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled history and stores unable to list with UNSUPPORTED instead of empty history** — Keep the opt-in separate from resume and distinguish unavailable history from an empty list.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a real store failure safely and keeps the history socket usable** — Sanitize the failure, log its session and keep answering frames.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members additively, preserving existing message literals and ConnectedMessage; accept and validate the composite cursor.
- [ ] Thread the separate default-off history option from createHalEngine through createServer; add UNSUPPORTED and exported StoreCannotList, with the retention note pointing to #41.
- [ ] Answer from the authenticated socket user's store outside the turn lock; serialize only summary metadata and retain paging and existing replay behavior.
- [ ] Map missing capability to UNSUPPORTED and operational failure to sanitized SERVER_ERROR with session-scoped logging.
- [ ] Document both frames and field tables, GDPR and deployer opt-in; warn when history is enabled without resume, update example/full-config.ts and regenerate docs with docs:fix.
- [ ] Add the consumer changelog entry and MINOR version bump; let CI run the build, coverage and documentation gates.

## Out of scope

- Titles, previews, deletion, server-held paging state, operator access and cross-tab synchronization.
- Reimplementing the already validated #143 store order or #45 resume authorization.
- External model calls: the concurrency case holds a real turn in an application lifecycle hook and releases it with an application policy error, exercising the same per-session lock without vendor access.
- Changing the test descriptor exporter: the current .lore/test-commands.yml list script emits only id, name and file, with no spec field support; source stamps and trailing spec links supply traceability without changing production tooling.