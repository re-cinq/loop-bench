# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and already accepts hooks; a throwing `beforeSession` is observable through it today, with no doubles.

## Done when these pass

- [ ] **rejects to the caller and still runs onError with (session, error) and then afterSession** — a throwing `beforeSession` still rejects with its own error, `onError` receives the same session and error, and `afterSession` then fires with the same session
      `src/orchestration/beforeSessionThrows.acceptance.test.ts`

The existing hook tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` must stay green and unedited. They pin the non-throwing `beforeSession` path.

## Facets

- [ ] Move the `beforeSession` call in `src/orchestration/chatOrchestrator.ts` inside the `try`
- [ ] Decide whether `afterSession` must be able to tell that the session never started, and record the answer in `specs/hal-engine-config-hooks/spec.md` (what a hook can assume about how much of the turn happened)
- [ ] Delete the first "Measured semantics" bullet (the `beforeSession`-before-`try` line) from the spec and fix that section's intro ("These three properties"), since the new guarantee now sits under "Installing hooks through config"
- [ ] Add a CHANGELOG entry saying what changes for an existing consumer (`onError`/`afterSession` now fire on a `beforeSession` failure)

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)