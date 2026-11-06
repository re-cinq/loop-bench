# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and already accepts a throwing `beforeSession`; the test drives it with real hooks and a real provider and fails on the missing `onError`/`afterSession` calls.

## Done when these pass

- [ ] **rejects with the beforeSession error and still fires onError and afterSession for it** — a throwing `beforeSession` still rejects the caller with the same error, `onError` receives the session and that error, then `afterSession` receives the session
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` so the throw reaches the existing `catch`/`finally`
- [ ] Keep `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited (non-throwing `beforeSession` unchanged)
- [ ] Decide whether `afterSession` must be able to tell "session never started" from "session finished", and record what a hook can assume about how much of the turn ran in `specs/hal-engine-config-hooks/spec.md`
- [ ] Remove the first "Measured semantics" bullet (the recorded flaw) from that spec and adjust the section's "These three properties" wording
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`onError` and `afterSession` now fire when `beforeSession` throws)

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds in `afterModelResponse` (HALEngine#93)