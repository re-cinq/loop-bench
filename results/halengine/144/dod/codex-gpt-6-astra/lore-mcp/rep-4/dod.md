# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createHalEngine` already expose the real validation and authenticated WebSocket paths. Five acceptance tests use real sockets, forwarding store instrumentation, real in-memory/Mongo stores and a lifecycle gate on the real orchestrator; no model request is needed.

## Done when these pass

- [ ] **validates history frames and composite cursors without changing existing messages** — accepts the additive request, enforces the amended composite cursor and limits, and preserves typed old message fixtures.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner with wire dates, pages ties, and resumes a listed conversation** — checks the opt-in factory path, metadata-only replies, recorded owner/options, current session inclusion, exact pages and existing replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses unavailable history with UNSUPPORTED and warns when history cannot be resumed** — separates history from resume, refuses default-off/disabled/unsupported stores, and warns about unusable history configuration.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **distinguishes a real store failure from a collection unable to list without leaking details or closing the socket** — exercises a closed Mongo client and a collection adapter exposing only the original methods, while connection storage remains real in-memory storage.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before the pending turn releases its session lock** — holds the real turn in its before-model hook and requires the list before releasing it; cleanup aborts the socket before any provider request.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members additively, keeping `ConnectedMessage` and old literals compatible; validate the amended composite cursor and limit independently of configuration.
- [ ] Thread independent, default-off history configuration from the engine factory to the server and handler; mirror the resume retention note pointing to #41.
- [ ] Read the connection's owner and forward `{limit, before}` to the store; send only four-field summaries with ISO dates, on request, with no turn terminator.
- [ ] Return `UNSUPPORTED` for disabled history and unsupported stores, export `StoreCannotList` for collection capability failures, and sanitize/log actual failures as `SERVER_ERROR` without closing the socket.
- [ ] Answer outside the turn lock, retain existing owned resume/replay, and warn when history is enabled without resume.
- [ ] Document Conversation list through `example/full-config.ts` and regenerate the getting-started listing with `npm run docs:fix`; add the consumer changelog entry and MINOR version bump, and state the release impact in the eventual PR description.
- [ ] Preserve spec citations and reconcile coverage status during implementation; let CI judge build, lint, coverage and documentation checks.

## Out of scope

- Titles, previews, deletion, operator views, server-held paging state, live tab sync, REST routes and an in-band conversation switch.
- Store ordering and retention changes already covered by #143; the tests exercise that existing behavior through the protocol.
- Production changes in this acceptance-test commit. The descriptor script currently emits only `{id, name, file}`; spec anchors are stamped beside tests and linked from normative statements, without changing the production/tooling interface here.