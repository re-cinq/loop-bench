# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real public orchestration seam and accepts lifecycle hooks directly, so the complete failure path is observable without doubles.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting with the same error** — A thrown `beforeSession` error reaches `onError` with the session and original error, then runs `afterSession`, and finally rejects the caller with that same error.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's guarded lifecycle so the failure reaches `onError` and `afterSession`.
- [ ] Specify what `afterSession` may assume when `beforeSession` failed.
- [ ] Document the changed failure-hook behaviour for existing consumers in the changelog.
- [ ] Keep the existing non-throwing lifecycle tests unchanged and green.

## Out of scope

- Non-`Error` throws and usage accounting across tool rounds.