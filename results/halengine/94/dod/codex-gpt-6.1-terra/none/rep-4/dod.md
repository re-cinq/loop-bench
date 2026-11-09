# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes the lifecycle hooks and the caller's rejection directly. A real provider can be supplied without contacting it because the failing hook runs first.

## Done when these pass

- [ ] **reports the original error and runs cleanup before rejecting** — A failed `beforeSession` reaches `onError` with the session and original error, then `afterSession`, before the same error reaches the caller; later turn hooks have not run.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing error and cleanup boundary while preserving the original rejection and successful hook behavior.
- [ ] Replace the recorded flaw in the spec with the guarantee, explaining that cleanup can follow a failed setup before the turn proceeds.
- [ ] Describe the consumer-visible hook change in the changelog and keep the existing tests unedited.
- [ ] Pass the ticket's CI checks.

## Out of scope

- Non-Error throws and usage accounting across tool rounds.