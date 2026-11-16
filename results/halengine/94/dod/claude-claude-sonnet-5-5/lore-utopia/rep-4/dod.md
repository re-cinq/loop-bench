# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createHalEngine(...).orchestrator.processMessage` is a real entry point that accepts hooks, so the test calls it today and fails on behaviour (hooks never fire).

## Done when these pass

- [ ] **still rejects to the caller, and runs onError with the error and afterSession** — a throwing `beforeSession` rejects with the same error, `onError` receives it, then `afterSession` runs.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` in `chatOrchestrator.ts`
- [ ] Spec: replace the recorded-flaw line with the guarantee, stating what `afterSession` can assume; add CHANGELOG entry

## Out of scope

- The `instanceof Error` gate on `onError`
- Usage accounting across tool rounds (HALEngine#93)