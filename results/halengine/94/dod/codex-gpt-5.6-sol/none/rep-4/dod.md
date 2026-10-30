# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real public orchestrator seam and accepts concrete lifecycle hooks, so the failed startup path is directly observable without doubles.

## Done when these pass

- [ ] **rejects unchanged and runs error and cleanup hooks when beforeSession throws** — pins the original rejection plus the `onError` argument identities and subsequent `afterSession` cleanup.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` under the orchestrator's existing `try`/`catch`/`finally` lifecycle.
- [ ] Replace the recorded flaw with the guaranteed failure semantics and document that `afterSession` must tolerate partial initialization.
- [ ] Add a CHANGELOG entry warning existing consumers that `onError` and `afterSession` now run for `beforeSession` failures.
- [ ] Keep the established non-throwing hook lifecycle unchanged and pass the existing repository checks.

## Out of scope

- Non-`Error` throws reaching `onError`, usage aggregation across tool rounds, and changing the hook signatures.