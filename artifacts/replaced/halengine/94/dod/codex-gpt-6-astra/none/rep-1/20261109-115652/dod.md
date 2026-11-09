# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real streaming lifecycle with deployer-installed hooks. One test observes error identity, hook arguments and order, and cleanup of a resource acquired before initialization fails; the real Bedrock provider is constructed but never reached.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — preserves the caller rejection, awaits error reporting and cleanup with the same session, and never enters user-input processing.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the lifecycle error-handling boundary so the acceptance test passes.
- [ ] Preserve existing successful-session tests unedited; CI runs those regression checks.
- [ ] Implement the spec's partial-initialization cleanup guarantee and add a consumer-facing CHANGELOG entry explaining that both hooks now run after initialization fails.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds (#93), although both remain unlinked measured properties in the shared spec.
- New lifecycle arguments, allocation-status flags, and failures thrown by error or cleanup hooks.
- Test discovery tooling: the existing Lore Jest descriptor emitter returns only id, name and file; the spec anchor is stamped in the test and linked in the spec without changing production tooling.