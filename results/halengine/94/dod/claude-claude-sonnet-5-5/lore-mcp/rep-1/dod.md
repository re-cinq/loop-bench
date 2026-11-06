# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and already accepts hooks; the test calls it with a throwing `beforeSession` and fails on behaviour (no hooks fire).

## Done when these pass

- [ ] **a beforeSession hook that throws still rejects the caller, and runs onError (session, error) then afterSession** — rejection unchanged; `onError` gets `(session, error)` like any other failure; `afterSession` fires after it.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `chatOrchestrator.ts`.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee (what a hook can assume about how much of the turn happened), link it to the test, and add a CHANGELOG entry.
- [ ] Existing `chatOrchestrator.test.ts` stays unedited and green.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).