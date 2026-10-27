# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real caller seam. One test observes the original rejection, `onError` arguments, and finalizer ordering when `beforeSession` throws.

## Done when these pass

- [ ] **beforeSession failure invokes both error and finalization hooks** — the same error and session reach `onError`, `afterSession` follows, and the original error still rejects the caller
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Pin the beforeSession failure path through the orchestrator entry point.
- [ ] State in the spec that afterSession runs even though the turn did not start, and that the caller receives the original rejection.

## Out of scope

- Non-throwing hook behavior, which remains covered by existing tests.
- The `instanceof Error` gate and usage accounting across tool rounds.