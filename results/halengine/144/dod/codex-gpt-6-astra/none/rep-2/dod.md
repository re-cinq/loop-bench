# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public `createHalEngine` factory, real WebSocket connections, validator and shipped stores already provide the seams. Five acceptance tests exercise the ticket's amended composite cursor contract, using real storage delegation and a lifecycle hook to hold a turn without calling an external model.

## Done when these pass

- [ ] **validates history limits and composite cursors without changing existing frames** — Accept the new frame independently of configuration; reject malformed fields by name in validation and on the wire.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner, pages ties, and resumes a listed conversation** — Return exactly the owner's metadata, record the actual store arguments, preserve cursor paging and open a listed conversation through existing resume.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **refuses disabled history and stores without listing with UNSUPPORTED** — Keep history independently opt-in and distinguish unavailable history from an empty history.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **distinguishes an unavailable listing capability from a failed database without leaking details** — Map missing collection capability and database failure separately, with a usable socket and safe failure logging.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers history while a turn owns the session lock** — Answer on the unlocked path while a real orchestrator turn is pending.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the four additive wire interfaces and union members, preserving existing message types and `ConnectedMessage`; validate integer limits and both composite cursor fields.
- [ ] Thread independent, default-off `transport.history` through the public factory and server; add `UNSUPPORTED` and answer unavailable listing capabilities explicitly.
- [ ] Answer authenticated history requests off the turn lock, passing `{limit, before}` unchanged and emitting only metadata with ISO timestamps.
- [ ] Export `StoreCannotList`, distinguish capability failures from database failures, and log failures with session id without exposing content or credentials.
- [ ] Keep selection on the existing resume/replay path and warn at startup when history is enabled without resume.
- [ ] Extend the protocol's frame tables and GDPR authorisation rule; mirror the retention note referencing #41 on history options; edit `example/full-config.ts` and regenerate getting-started documentation with `npm run docs:fix`.
- [ ] Add the installer-facing changelog entry, MINOR version bump and PR rationale, and satisfy CI's existing coverage, build, documentation and spec gates without changing spec Status rows in this test-only round.

## Out of scope

- Conversation titles or previews, erasure frames, server-held pagination state, operator access to another user's history, and cross-tab live sync.
- Production implementation in this commit; the protocol documentation, release changes and compatibility review remain implementation facets, not source-text assertions.
- Changes to Lore's descriptor adapter: `.lore/test-commands.yml` invokes `scripts/lore-list-tests.mjs`, which currently emits only `id`, `name`, and `file`, with no `spec` field support. Tests carry `@spec` anchors for statements 37–41 and the spec has named inline citations; teaching the adapter to expose `spec` would require a tooling change outside this test-only task.