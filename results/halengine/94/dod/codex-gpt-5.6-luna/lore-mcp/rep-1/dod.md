# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real entry point and accepts lifecycle hooks directly, so the acceptance test can observe the rejection and both hook calls without a new seam.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — a thrown `beforeSession` rejection reaches the caller unchanged, invokes `onError` with the same error, and invokes `afterSession` after it
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the existing `try` so its failure reaches the existing `catch` and `finally`.
- [ ] Record in the spec that after a failed `beforeSession`, hooks know only that `beforeSession` was entered; the rest of the turn did not start.
- [ ] Add a CHANGELOG entry describing the lifecycle change for existing consumers.
- [ ] Keep the existing non-throwing `beforeSession` tests unedited and passing.

## Out of scope

- The `instanceof Error` gate for `onError`.
- Usage accounting across tool rounds (HALEngine#93).