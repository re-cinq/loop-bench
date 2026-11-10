# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — A lifecycle hook seam already exists via `createHalEngine` and `OrchestratorHooks`. The acceptance test configures `beforeSession`, `onError`, and `afterSession` hooks, throwing an error from `beforeSession`, and verifies that `onError` and `afterSession` fire while the rejection reaches the caller.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — When beforeSession throws, onError and afterSession fire in order with the session before the rejection propagates to the caller
      `src/config.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so throws reach `catch` and `finally`
- [ ] Verify that existing tests in `src/config.test.ts` and `src/orchestration/chatOrchestrator.test.ts` remain green
- [ ] Add an entry in `CHANGELOG.md` documenting the guarantee that `onError` and `afterSession` run when `beforeSession` throws

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)