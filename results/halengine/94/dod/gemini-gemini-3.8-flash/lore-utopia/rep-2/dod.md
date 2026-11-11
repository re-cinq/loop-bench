# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — A lifecycle hook seam already exists on `createChatOrchestrator` through `OrchestratorHooks`. The acceptance test calls `orchestrator.processMessage(session)` directly with a throwing `beforeSession` hook to verify whether `onError` and `afterSession` run.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — when `beforeSession` throws, `onError` and `afterSession` both fire in order and the original rejection propagates to the caller.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` await inside the `try` block in `src/orchestration/chatOrchestrator.ts` so throws reach `catch` and `finally`
- [ ] Confirm existing tests (`called before anything else`, `full lifecycle order`, config forwarding) remain green for non-throwing `beforeSession`
- [ ] Add a CHANGELOG entry under `[Unreleased]` describing that `onError` and `afterSession` now fire when `beforeSession` throws

## Out of scope

- The `instanceof Error` gate on `onError` (tracked as its own issue)
- Usage accounting across tool rounds (HALEngine#93)