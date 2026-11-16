# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and takes hooks, so the tests call it today and fail on behaviour.

## Done when these pass

- [ ] **reaches onError with (session, error) and still rejects the caller with that same error** — a throwing `beforeSession` rejects the caller unchanged and fires `onError(session, error)`.
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **still runs afterSession, once, with the session** — `afterSession` fires after a throwing `beforeSession`.
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `chatOrchestrator.ts`; existing tests stay unedited and green.
- [ ] Replace the recorded-flaw line in the spec with the guarantee, stating what a hook can assume about how much of the turn happened.
- [ ] CHANGELOG entry for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).