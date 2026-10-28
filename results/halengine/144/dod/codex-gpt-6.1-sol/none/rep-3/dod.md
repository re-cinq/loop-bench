# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — `validateMessage` and `createHalEngine` are existing public seams. Acceptance tests use real WebSocket upgrades, the shipped in-memory store and provider, a forwarding store subclass to record actual arguments, and a public lifecycle hook to hold a real turn pending.

## Done when these pass

- [ ] **validates history windows and rejects invalid limits or incomplete composite cursors** — accepts the additive frame and validates composite pagination without a feature flag.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner, pages wire summaries and resumes a listed conversation** — authenticates through the upgrade, observes actual store arguments, ISO metadata, ordering, current-session inclusion, paging and existing replay.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses history unless opted in and supported by the store** — default-off, explicit-off and an original five-member store all answer `UNSUPPORTED` without closing the socket.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history before a pending turn can send stream_end** — history bypasses the turn lock.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **reports a failing store safely and keeps the socket usable** — a revoked real store callable exercises exception handling, sanitized output and session-scoped logging.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members additively, preserving all existing message literals and `ConnectedMessage`.
- [ ] Validate optional limits and complete composite cursors independently of configuration.
- [ ] Thread default-off history configuration from `createHalEngine` through `createServer` to the non-locked handler.
- [ ] Answer only requested, authenticated-owner metadata using the original pagination options and ISO timestamps.
- [ ] Return `UNSUPPORTED` for disabled history, absent `listFor`, or `StoreCannotList`; sanitize and log other store failures as `SERVER_ERROR`.
- [ ] Preserve existing resume/replay and warn at startup for history enabled without resume.
- [ ] Mirror the retention note pointing at #41 on the history options type; document the separate disclosure opt-in and resume dependency.
- [ ] Update `example/full-config.ts`, regenerate getting-started docs, add a consumer changelog entry and make the version change MINOR.

## Out of scope

- Titles, previews, deletion, operator access to another user's conversations, server-side paging state and live synchronization between tabs.
- Production implementation in this acceptance-test commit.