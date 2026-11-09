# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The real validator and `createHalEngine` socket path already exist. Five acceptance tests use real stores, a recording delegate, the shipped local provider, and a lifecycle hook to hold a turn; no production code is changed.

## Done when these pass

- [ ] **validates list requests and composite cursors without accepting malformed paging fields** — Static validation and field-specific refusals, with foreign user ids discarded.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the socket owner with ISO metadata, pages ties and resumes a listed conversation** — Authenticated ownership at the store argument, metadata-only response, current conversation, cursor forwarding and existing replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is off or the store cannot list** — Independent opt-in and both missing capability paths.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a real store failure without disclosing its detail and keeps the socket usable** — Real Mongo URL parsing failure, sanitised response, session-scoped log and continued ping handling.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before stream_end while a turn holds the session lock** — A history response arrives while a real orchestrator turn remains open.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive protocol interfaces and union members; retain legacy message compatibility, including ConnectedMessage.
- [ ] Validate the amended composite cursor and limit without consulting configuration.
- [ ] Thread history configuration through the engine and answer on the unlocked path with the connection identity.
- [ ] Distinguish disabled or unavailable listing from store failure, including exported StoreCannotList, with sanitised errors and logs.
- [ ] Preserve existing resume/replay and warn when history is enabled without resume.
- [ ] Finish protocol field tables and GDPR/retention documentation; edit example/full-config.ts and regenerate getting-started with docs:fix.
- [ ] Add the consumer-facing changelog and MINOR version change; keep CI's existing compatibility, spec and coverage checks green once these tests pass.

## Out of scope

- Titles, previews, deletion, operator access, server-side paging state and cross-tab live sync.
- Reimplementing the already-tested store ordering or resume mechanisms.
- Source-text assertions for documentation, versioning or additive diffs; these remain review and existing CI obligations.