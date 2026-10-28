# Definition of Done

> It does not give a **client** anything: the browser holding the socket cannot reach the store, so
> every consumer that wants a history sidebar has to stand up its own authenticated HTTP route over
> the same data the engine already authenticated on the upgrade.

**Strategy: `direct`** — The public engine factory, real WebSocket connection, validator, and in-memory store already expose the necessary entry points. Tests use the shipped mock provider with the real orchestrator; recording delegates to the real store, and revoking a callable store resource exercises failure containment without a replacement implementation.

## Done when these pass

- [ ] **validates list requests and both halves of the composite cursor without accepting malformed fields** — Pins the corresponding protocol requirement.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **lists only the authenticated owner, forwards paging unchanged, and resumes a listed conversation** — Pins the corresponding protocol requirement.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers UNSUPPORTED when history is absent, disabled, or the store has no listing capability** — Pins the corresponding protocol requirement.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **answers a history request before stream_end while the same session has a running turn** — Pins the corresponding protocol requirement.
      `src/transport/conversationList.acceptance.test.ts`
- [ ] **contains a failed store call as SERVER_ERROR without leaking details or closing the socket** — Pins the corresponding protocol requirement.
      `src/transport/conversationList.acceptance.test.ts`

## Facets

- [ ] Add the additive wire types, composite cursor validation and UNSUPPORTED code.
- [ ] Thread the separate history opt-in from the public configuration into the non-locked handler.
- [ ] Serialize owner-only summaries and preserve paging arguments; retain existing resume/replay behavior.
- [ ] Refuse unavailable history and contain store failures with sanitized logging; distinguish StoreCannotList as UNSUPPORTED.
- [ ] Keep listing responsive during a turn and never send unsolicited lists or stream_end for history.
- [ ] Document both frame field tables, GDPR/retention implications and the history-without-resume warning; regenerate getting-started from the example, add a release note and a minor version bump.

## Out of scope

- Titles or previews, deletion, operator access, server-held paging state, and cross-tab live sync.
- Existing protocol requirements unrelated to conversation lists.