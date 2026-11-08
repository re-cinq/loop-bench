# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator's entry point `processMessage` (or `processMessageStream`) is accessible and allows installing hooks. The tests will provide a `beforeSession` hook that throws and verify the side effects on `onError` and `afterSession`.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — Verifies that a rejection in `beforeSession` is caught and passed to the `onError` hook.
  `src/orchestration/beforeSession-error.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — Verifies that `afterSession` runs even if `beforeSession` failed, ensuring cleanup can happen.
  `src/orchestration/beforeSession-error.acceptance.test.ts`

- [ ] **rejection propagates to caller** — Verifies that the original error from `beforeSession` is still what the caller receives.
  `src/orchestration/beforeSession-error.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `chatOrchestrator.ts`.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [ ] Update `CHANGELOG.md` with the fix.

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).