# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and accepts hooks, so the test calls it today and fails on behaviour.

## Done when these pass

- [ ] **a beforeSession hook that throws still rejects to the caller, and fires onError with that error and afterSession** — the rejection is unchanged, `onError` receives the thrown Error, and `afterSession` runs, in that order.
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee (what `afterSession` can assume), link it to the test, and add a CHANGELOG entry
- [ ] Existing `chatOrchestrator.test.ts` stays unedited and green

## Out of scope

- The `instanceof Error` gate on `onError`
- Usage accounting across tool rounds (HALEngine#93)