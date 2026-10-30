# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The real `createChatOrchestrator(...).processMessage(...)` entry point accepts lifecycle hooks directly, so the failed startup path and the caller-visible rejection are observable without a new seam.

## Done when these pass

- [ ] **rejects with the original error after onError and afterSession receive the session** — A `beforeSession` throw reaches `onError` with the session and original error, then reaches `afterSession`, and the same error rejects the caller.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the orchestrator's existing `try`/`catch`/`finally` lifecycle.
- [ ] Replace the measured-flaw statement with the guaranteed failure lifecycle and its cleanup assumption.
- [ ] Document the changed hook behavior for existing consumers in the changelog.
- [ ] Keep the existing non-throwing `beforeSession` lifecycle tests unedited and green.

## Out of scope

- Non-`Error` throws bypassing `onError`, usage aggregation across tool rounds, and changes to successful-session hook behavior.