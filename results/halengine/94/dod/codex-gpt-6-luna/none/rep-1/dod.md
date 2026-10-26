# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes `processMessage` as a real seam, so the test exercises the failing lifecycle through the orchestrator without doubles.

## Done when these pass

- [ ] **beforeSession rejection runs error and cleanup hooks** — preserves the thrown error for the caller, passes its session and error to `onError`, and runs `afterSession` even though the turn did not proceed.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the protected lifecycle so its failure reaches `onError` and `afterSession`.
- [ ] Document that `afterSession` receives a session whose turn may never have started.

## Out of scope

- The `instanceof Error` gate for `onError` and usage accounting across tool rounds.