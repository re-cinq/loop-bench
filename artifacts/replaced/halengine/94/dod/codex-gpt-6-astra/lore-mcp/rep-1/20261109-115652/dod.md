# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real streaming implementation and installed hooks. One test uses a real provider instance (never reached), real session values and resource ownership to observe error reporting and cleanup without doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — awaits `onError(session, error)` followed by `afterSession(session)`, releases a partially initialized resource, skips user/model work and preserves rejection identity.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error-handling boundary and make the acceptance test green.
- [ ] Keep existing successful lifecycle tests unedited and passing in CI.
- [ ] Retain the spec's explicit cleanup contract: initialization may be partial, no started flag is supplied, and hooks track their own allocations.
- [ ] Add a CHANGELOG entry explaining the additional error/cleanup calls for existing consumers.
- [ ] Pass the repository's build, tests, typecheck, ESLint and formatting gates in CI.

## Out of scope

- Changing the `instanceof Error` gate, errors thrown by cleanup hooks, and usage accounting across tool rounds (#93).
- New lifecycle arguments or a session-started flag.
- Changing Lore's descriptor emitter: `.lore/test-commands.yml` uses a script that emits only `id`, `name`, and `file`; the test stamps its spec anchor and the spec carries the named validation link, but the existing emitter has no `spec` field support.