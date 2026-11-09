# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real lifecycle hooks and message entry point. A real provider can be constructed without contacting it on the failed setup path.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession while preserving its rejection** — A setup error reaches `onError` and `afterSession` in order with the original session and error, stops later turn hooks, and remains the caller's rejection.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error and cleanup boundary, preserving the original rejection and successful lifecycle.
- [ ] Document that `afterSession` can run when setup failed before later turn hooks, and update the changelog for existing consumers.
- [ ] Keep the existing non-throwing lifecycle tests unedited and green, along with the repository's CI checks.

## Out of scope

- Non-Error rejections bypassing `onError` and usage accounting across tool rounds.