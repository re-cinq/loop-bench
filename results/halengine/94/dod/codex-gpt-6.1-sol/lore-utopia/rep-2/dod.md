# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` exercises the real streaming lifecycle. Installed hooks allocate and release a real resource; the built-in provider requires no test doubles.

## Done when these pass

- [ ] **reports a beforeSession failure and cleans up partial setup before rejecting with the original error** — pins original error identity, hook argument identities and order, cleanup of partial setup, and absence of subsequent turn work.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move session setup into the existing error-handling boundary so the acceptance test passes without editing existing success-path tests.
- [ ] Preserve the spec guarantee that cleanup may see incomplete setup and must tolerate partially allocated resources.
- [ ] Add a consumer-facing CHANGELOG entry explaining that failed setup now invokes error and cleanup hooks.
- [ ] Let CI verify the existing tests, build, typecheck, lint and formatting checks.

## Out of scope

- Non-Error rejection handling and usage accounting across tool rounds (#93).
- New hook parameters or a new session-started flag; hooks can track their own allocation state on the existing session argument.