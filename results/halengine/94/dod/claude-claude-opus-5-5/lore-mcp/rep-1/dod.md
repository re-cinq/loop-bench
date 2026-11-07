# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and already accepts `hooks`; a throwing `beforeSession` is observable through it today with a real provider and real hooks, no doubles.

## Done when these pass

- [ ] **a beforeSession hook that throws rejects to the caller unchanged, after onError and then afterSession have both run for that throw** — the caller still gets the very error `beforeSession` threw; `onError(session, error)` fires with the same session and error objects; `afterSession(session)` fires after it.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call in `src/orchestration/chatOrchestrator.ts` inside the `try`, so its throw reaches the existing `catch`/`finally` (acceptance test goes green).
- [ ] Decide whether `afterSession` must be able to tell "session never started" from "allocated and finished", and state what a hook may assume about how much of the turn ran in `specs/hal-engine-config-hooks/spec.md`.
- [ ] Remove the first bullet of "Measured semantics — out of scope" in that spec (the recorded flaw), and re-anchor the remaining `chatOrchestrator.ts#Lnn` links that the move shifts.
- [ ] CHANGELOG entry saying what changes for an existing consumer (`onError`/`afterSession` now run when `beforeSession` throws; `session` is also saved via `saveSession` on that path).
- [ ] Existing tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green, unedited (non-throwing `beforeSession` unchanged).

## Out of scope

- The `error instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds in `afterModelResponse` (HALEngine#93).