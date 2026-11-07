# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator hooks can be observed by passing mocks to `createChatOrchestrator` and calling `processMessage`.

## Done when these pass

- [x] **onError fires when beforeSession throws** — The `onError` hook must be called with the session and the thrown error.
  `src/orchestration/chatHooks.acceptance.test.ts`
- [x] **afterSession fires when beforeSession throws** — The `afterSession` hook must be called even if `beforeSession` failed.
  `src/orchestration/chatHooks.acceptance.test.ts`
- [x] **beforeSession rejection propagates** — The orchestrator must still reject with the same error thrown by `beforeSession`.
  `src/orchestration/chatHooks.acceptance.test.ts`
## Facets

- [ ] Move `beforeSession` call inside the `try` block in `chatOrchestrator.ts`.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [x] Update `CHANGELOG.md` with the change in hook behavior.

## Out of scope

- `instanceof Error` gate on `onError` (its own issue)
- usage accounting across tool rounds (HALEngine#93)