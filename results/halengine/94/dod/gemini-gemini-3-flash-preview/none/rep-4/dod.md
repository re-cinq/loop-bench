# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator's `processMessageStream` has a clear `try/catch/finally` block. Moving the `beforeSession` call inside this block will allow `onError` and `afterSession` to fire as expected.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — Verifies that `onError` is called with the error thrown by `beforeSession`.
  `src/orchestration/beforeSessionError.acceptance.test.ts`
- [ ] **afterSession fires when beforeSession throws** — Verifies that `afterSession` is called even if `beforeSession` throws.
  `src/orchestration/beforeSessionError.acceptance.test.ts`
- [ ] **beforeSession rejection propagates to caller** — Verifies that the original error still reaches the caller.
  `src/orchestration/beforeSessionError.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantees.
- [ ] Add CHANGELOG entry.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds (HALEngine#93).