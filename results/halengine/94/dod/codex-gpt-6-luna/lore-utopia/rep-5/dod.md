# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point and accepts lifecycle hooks, so the failure path is directly observable without doubles or a new seam.

## Done when these pass

- [ ] **Rejects unchanged while running onError and afterSession before the turn starts** — pins propagation of the original failure, both callbacks and their argument shape, and that later turn work has not begun.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try` so its rejection enters the existing `catch` and `finally`.
- [ ] Specify that `afterSession` runs after a failed `beforeSession` and must assume no later turn work began.

## Out of scope

- The `instanceof Error` gate for `onError`.
- Usage accounting across tool rounds (HALEngine#93).
- Behavior for a non-throwing `beforeSession`, which existing tests already cover.