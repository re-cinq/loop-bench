# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The validator and `createHalEngine` already expose the real entry points. The tests use real WebSockets and stores, with forwarding adapters for the original store/collection ports, a closed MongoDB client for a genuine store failure, and a consumer hook holding a real turn before any external provider call.

## Done when these pass

- [ ] **validates list requests and rejects malformed limits and composite cursors** — Accept the additive request and enforce the amended composite cursor contract.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **lists only the authenticated user metadata, pages tied rows and resumes a listed conversation** — Authorize from the connection, serialize metadata, page without losing ties, and reopen a listed conversation.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **refuses disabled or unavailable history and sanitizes real store failures without closing the socket** — Require opt-in, distinguish unsupported capability from failure, sanitize errors, and keep the socket usable.
      `src/transport/conversationList.acceptance.test.ts`

- [ ] **answers history while the same session turn holds the lock** — Answer history independently of the per-session turn lock.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four protocol interfaces and union members without changing existing message contracts; retain all legacy literal compatibility.
- [ ] Validate optional limits and both cursor halves without consulting configuration.
- [ ] Thread independent history opt-in from `HalEngineConfig` through `createServer`; dispatch outside the turn lock with `ws.userId` and unchanged pagination.
- [ ] Return metadata-only ISO summaries, no unsolicited lists or turn terminator, and reuse the existing reconnect/replay path.
- [ ] Add `UNSUPPORTED` and exported `StoreCannotList`; distinguish missing capability from database failure and log failures with session id but no personal content.
- [ ] Warn when history is enabled without resume; mirror the retention note pointing to #41 on the history options type.
- [ ] Document the two frame field tables and authorization/privacy contract; update `example/full-config.ts` and regenerate the getting-started conversation-list documentation with `npm run docs:fix`.
- [ ] Add the consumer changelog entry, MINOR version bump and PR rationale; let CI run compatibility, build, coverage and documentation gates.

## Out of scope

- Titles/previews, deletion, server-held paging state, operator access, tab synchronization, a new replay implementation, and unrelated uncited statements in the general WebSocket spec.
- No production implementation is included in this acceptance-test commit.