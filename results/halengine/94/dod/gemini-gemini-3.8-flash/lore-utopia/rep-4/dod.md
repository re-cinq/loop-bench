# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `createChatOrchestrator` factory accepts lifecycle hooks and returns an orchestrator whose `processMessage` entry point can be invoked directly with a throwing `beforeSession` hook to observe `onError` and `afterSession` execution.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — when beforeSession throws, onError and afterSession both run in order before the rejection propagates to the caller with the original error
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw is caught and reaches `finally`
- [ ] Confirm existing tests for non-throwing `beforeSession` and lifecycle order remain green
- [ ] Clarify in `specs/hal-engine-config-hooks/spec.md` what a hook can assume about how much of the turn happened
- [ ] Add CHANGELOG entry documenting that `onError` and `afterSession` now fire when `beforeSession` throws and note migration considerations

## Out of scope

- The `instanceof Error` gate on `onError` (separate issue)
- Usage accounting across tool rounds (re-cinq/HALEngine#93)