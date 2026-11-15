# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(session)` is the real entry point and already accepts the hooks; the test installs a throwing `beforeSession` and observes the rejection and which hooks fire. No doubles beyond a plain answering provider.

## Done when these pass

- [ ] **a beforeSession hook that throws › still rejects with its error, and fires onError with (session, error) and then afterSession** — the caller still gets the original error as a rejection, `onError` receives the same session and error objects, and `afterSession` fires after it
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts` so it shares the `catch`/`finally`
- [ ] Existing `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green, unedited (non-throwing `beforeSession` unchanged)
- [ ] Decide and record in `specs/hal-engine-config-hooks/spec.md` what `afterSession` can assume about how much of the turn happened (e.g. whether it can tell "beforeSession failed" from "turn ran")
- [ ] Remove the first "Measured semantics" bullet in the spec (the recorded flaw) and fix "These three properties" to match
- [ ] CHANGELOG `[Unreleased]` entry: what changes for an existing consumer (`onError` and `afterSession` now fire, and the session is saved, after a failed `beforeSession`)

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)