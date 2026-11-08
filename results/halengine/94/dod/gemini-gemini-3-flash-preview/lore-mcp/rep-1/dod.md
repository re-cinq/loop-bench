# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator's `processMessageStream` is a public entry point that can be exercised with a session and mock hooks. The acceptance tests will provide a `beforeSession` hook that throws and verify that `onError` and `afterSession` are nonetheless executed.

## Done when these pass

- [x] **onError fires when beforeSession throws** — The `onError` hook must be called with the session and the error thrown by `beforeSession`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **afterSession fires when beforeSession throws** — The `afterSession` hook must be called even if `beforeSession` fails, ensuring cleanup logic runs.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [x] Add entry to `CHANGELOG.md` about the behavior change.

## Out of scope

- `instanceof Error` gate on `onError` (its own issue #97).
- usage accounting across tool rounds (HALEngine#93).