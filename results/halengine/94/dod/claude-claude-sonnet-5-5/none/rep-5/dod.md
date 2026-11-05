# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and accepts hooks, so the test calls it with a throwing `beforeSession` and fails on behaviour today.

## Done when these pass

- [ ] **a beforeSession hook that throws reaches the caller as a rejection and still runs onError, then afterSession, with the same error** — the rejection is unchanged, `onError` receives (session, error) with the thrown error, and `afterSession` runs after it.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, stating what `afterSession` can assume about how much of the turn happened
- [ ] CHANGELOG entry for existing consumers

## Out of scope

- The `instanceof Error` gate on `onError`
- Usage accounting across tool rounds (HALEngine#93)