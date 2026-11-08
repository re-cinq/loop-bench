# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `ChatOrchestrator` provides a `hooks` seam that is already exercised by unit tests. The acceptance tests will use `createChatOrchestrator` with a `beforeSession` hook that throws and assert that `onError` and `afterSession` are called.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — A `beforeSession` that throws triggers the `onError` hook with the same error.
      `src/orchestration/beforeSession_failure.acceptance.test.ts`
- [ ] **afterSession fires when beforeSession throws** — A `beforeSession` that throws still triggers the `afterSession` cleanup hook.
      `src/orchestration/beforeSession_failure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [ ] Update `CHANGELOG.md` with the breaking change (if considered such) or fix.

## Out of scope

- The `instanceof Error` gate on `onError` (tracked by its own issue).
- Usage accounting across tool rounds (HALEngine#93).