# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `ChatOrchestrator` can be instantiated with hooks that throw. The acceptance test will verify that `onError` and `afterSession` are called when `beforeSession` throws.

## Done when these pass

- [x] **runs onError and afterSession when beforeSession throws** — Verifies that a failure in `beforeSession` is caught and triggers the error and cleanup hooks.
  `src/orchestration/beforeSession-error.acceptance.test.ts`

## Facets

- [x] Create `src/orchestration/beforeSession-error.acceptance.test.ts` with a failing test case.
- [ ] Update `src/orchestration/chatOrchestrator.ts` to move `beforeSession` inside the `try` block.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [x] Add entry to `CHANGELOG.md`.
## Out of scope

- `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)