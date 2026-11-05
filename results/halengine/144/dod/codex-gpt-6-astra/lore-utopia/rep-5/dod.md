# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` factory and real WebSocket connections expose the missing behavior; `validateMessage` exposes the static frame contract. Five tests cover the protocol boundary using shipped stores, a recording decorator that delegates real queries, and a closed MongoDB driver; no mocks or stubs are used.

## Done when these pass

- [ ] **validates history limits and composite cursors independently of feature configuration** — Accept the new frame, reject malformed fields, strip identity, retain the legacy message fixtures.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner, pages tied activity, and resumes a listed conversation** — Deliver exact metadata, enforce ownership at the recorded store argument, preserve pagination and existing replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled history and stores without listing with UNSUPPORTED, never an empty history** — Default off independently of resume, explicit disable, absent capability, and a warning for history without resume.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **distinguishes an incapable collection from a failed store without leaking details or closing the socket** — Map the public StoreCannotList to UNSUPPORTED and real driver failures to sanitized SERVER_ERROR with session-scoped logging.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while the real streaming turn holds the session lock** — Answer before a pending turn can finish, using the real orchestrator's lifecycle hook to hold it and disconnecting before any provider request.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members, preserving existing message shapes, and validate limits and both cursor fields.
- [ ] Thread history from config through createServer; answer with connection-owned summaries off the turn lock, without unsolicited frames or stream_end.
- [ ] Add default-off capability checks, the public StoreCannotList distinction, sanitized errors and logging, and the history-without-resume warning.
- [ ] Preserve tied pagination, current-conversation inclusion, and existing ownership-checked reconnect/replay.
- [ ] Mirror the retention note pointing to #41; document the opt-in and resume prerequisite, edit example/full-config.ts and regenerate the documentation with npm run docs:fix.
- [ ] Add a consumer-facing Unreleased changelog entry and MINOR version bump; retain spec traceability and satisfy CI's checks and coverage floors.

## Out of scope

- Titles, previews, deletion, server-held pagination state, operator access to other users, live tab synchronization, REST routes, and a new conversation-switch or replay protocol.
- Re-testing already linked store-only spec statements from #143 or unrelated uncovered protocol statements.
- Production implementation in this acceptance-test commit; no model service or running MongoDB server is required by these tests.