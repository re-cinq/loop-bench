# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(session)` is the real entry point and `OrchestratorHooks` is the seam: a `beforeSession` that throws is observable today through which hooks fire and what the caller receives. No doubles needed; the test uses a real in-memory provider object and real hooks.

## Done when these pass

- [ ] **a beforeSession hook that throws still rejects to the caller, and runs onError with (session, error) and then afterSession** — the caller still gets the original error as a rejection; `onError` fires once with the same session and the thrown error; `afterSession` fires after it
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

Existing tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` must stay green and unedited (the non-throwing `beforeSession` path is unchanged).

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` so its throw reaches the existing `catch`/`finally`
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` what `afterSession` can assume about how much of the turn ran (the ticket asks: does it need to know the session never started?)
- [ ] Remove the first "Measured semantics — out of scope" bullet (the recorded `beforeSession` flaw) from that spec; the new guarantee lives under "beforeSession failure"
- [ ] CHANGELOG entry saying what changes for an existing consumer (`onError`/`afterSession` now fire when `beforeSession` throws)
- [ ] Update the CLAUDE.md / docs hook fire-order note if it states otherwise

## Out of scope

- The `instanceof Error` gate on `onError` (non-`Error` throws still skip it; its own issue)
- Usage accounting across tool rounds in `afterModelResponse` (HALEngine#93)