# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(session)` is the real entry point and already accepts `hooks`; a throwing `beforeSession` is observable there with a real provider and no doubles.

## Done when these pass

- [ ] **a beforeSession hook that throws › still rejects to the caller, and runs onError with (session, error) and then afterSession** — the caller still gets the thrown error as the rejection; `onError` receives the turn's session and that error; `afterSession` runs after it
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` so the test goes green
- [ ] Keep the existing `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green, unedited (non-throwing `beforeSession` unchanged)
- [ ] Decide whether `afterSession` must be able to tell "session never started" from "finished", and state in `specs/hal-engine-config-hooks/spec.md` what a hook can assume about how much of the turn happened
- [ ] Delete the first bullet under "Measured semantics — out of scope" in the spec (the recorded flaw) and fix that section's "three properties" count
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`onError`/`afterSession` now fire after a failed `beforeSession`)

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds in `afterModelResponse` (HALEngine#93)