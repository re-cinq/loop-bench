# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createHalEngine(...).orchestrator.processMessage(...)` is the real public entry point and already accepts all three lifecycle hooks, so the failure path can be observed without a new seam.

## Done when these pass

- [ ] **rejects unchanged while running onError and afterSession in order** — a throwing `beforeSession` preserves the original rejection, calls `onError` with the session and error, then calls `afterSession` with the session
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the existing `try` so its failure reaches the shared `catch` and `finally`.
- [ ] Document in the hook spec that `afterSession` runs even when session setup throws, and what the hook may assume about the turn.
- [ ] Add the existing-consumer impact to the Unreleased changelog.
- [ ] Keep the existing non-throwing lifecycle tests unedited and passing.

## Out of scope

- The `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changes to the build, lint, typecheck, formatter, or unrelated hook behavior.