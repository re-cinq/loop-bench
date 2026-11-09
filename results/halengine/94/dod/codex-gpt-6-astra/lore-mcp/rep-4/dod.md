# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — Call the real orchestrator's `processMessage`, which consumes `processMessageStream`, with lifecycle hooks that allocate, fail, report, and release a real resource. Use the shipped local provider and prompt builder without test doubles.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Original rejection identity, awaited error reporting and cleanup in order, original hook arguments, and no user-input/model processing after failed initialization.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Put `beforeSession` within the existing failure-handling boundary so the acceptance test passes.
- [ ] Preserve the existing successful-session tests unedited; CI runs the regression suite.
- [ ] Retain the new spec guarantee: cleanup runs even after partial initialization and must track allocation state.
- [ ] Add a consumer-facing CHANGELOG entry explaining error reporting and cleanup after failed initialization.
- [ ] Pass the ticket's build, test, typecheck, ESLint and formatting checks in CI.

## Out of scope

- Non-Error throws and the `instanceof Error` gate.
- Usage accounting across tool rounds (HALEngine#93).
- Changing hook signatures or introducing a session-started flag.
- Failures thrown by `onError` or `afterSession` themselves.