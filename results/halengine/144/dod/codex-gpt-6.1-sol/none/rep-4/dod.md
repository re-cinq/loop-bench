# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createServer` already provide real entry points. Five acceptance scenarios exercise validation and real authenticated WebSocket upgrades against shipped stores, without replacing the transport, orchestrator or provider with doubles.

## Done when these pass

- [ ] **validates list requests and composite cursors independently of feature configuration** — accepts the additive frame, strips foreign fields and rejects malformed limits and composite cursors by field name.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **delivers only the authenticated user metadata, pages ties and opens a listed conversation through resume** — one metadata-only response, ISO dates, current conversation included, authenticated store argument recorded, pagination forwarded unchanged, and existing resume/replay exercised.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled history and stores without listing with UNSUPPORTED instead of an empty history** — opt-in and missing capability produce a single explicit refusal.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a real store failure safely and treats a collection without find as unsupported** — closed Mongo client produces a sanitized failure, session-scoped logging and an open socket; a real legacy collection adapter is an unsupported capability.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before a running turn releases its session lock** — a real orchestrator policy hook holds a turn open while history is answered, without a premature stream_end or external model call.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four public protocol interfaces and union members additively; preserve all existing message literals and ConnectedMessage.
- [ ] Validate the amended composite cursor and bounded integer limit independently of configuration.
- [ ] Thread the separate, default-off transport.history option and store through createServer to the non-turn handler.
- [ ] Deliver only ws.userId's summaries, passing both paging options, serializing dates and never sending history stream_end or unsolicited lists.
- [ ] Refuse disabled or unavailable history with UNSUPPORTED; export StoreCannotList to distinguish a missing collection capability from transient failure.
- [ ] Sanitize and log store failures with session context while preserving the socket; keep history outside the turn lock.
- [ ] Preserve the existing ownership-checked resume and replay path for a chosen row.
- [ ] Mirror the #41 retention note on history options, warn on history without resume, document the deployment choice and reconnect requirements in example/full-config.ts, and regenerate docs with npm run docs:fix.
- [ ] Add an installer-facing Unreleased changelog entry and a MINOR version bump; preserve spec Status rows until the implementation round evaluates coverage.

## Out of scope

- Titles, previews, deletion frames, operator access, server-held paging state and cross-tab synchronization.
- New in-band switching, REST endpoints or replay mechanisms.
- Source-text assertions for documentation, additive diffs or version policy; those remain implementation review and existing CI gates.