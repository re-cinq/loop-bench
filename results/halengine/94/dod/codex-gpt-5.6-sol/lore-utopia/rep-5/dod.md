# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts lifecycle hooks directly, so the failure and both follow-up hooks are observable without a test double.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting with the original error** — pins that the original rejection reaches the caller after `onError` receives the session and error and `afterSession` receives the session.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's protected lifecycle so its failure reaches `onError` and `afterSession`.
- [ ] Preserve the original `beforeSession` error as the caller-visible rejection.
- [ ] Document that `afterSession` may receive a session whose initialization only partially completed.
- [ ] Add an Unreleased changelog entry describing the changed failure-hook behavior for consumers.
- [ ] Keep the existing successful-`beforeSession` tests unedited and green.

## Out of scope

- Non-`Error` rejections and usage accounting across tool rounds.