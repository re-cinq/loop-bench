# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real caller seam and accepts lifecycle hooks directly. One failure-path test observes the caller rejection, both downstream hooks, their arguments, and the partial-start cleanup contract together.

## Done when these pass

- [ ] **reports and cleans up a partially started session before rejecting with the beforeSession error** — A partially acting `beforeSession` that throws passes the same session and error to `onError`, then runs `afterSession`, and rejects the caller with that same error.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's protected failure path so `onError` and `afterSession` run before the original error is rethrown.
- [ ] Document that `afterSession` may receive a session whose `beforeSession` setup only partially completed.
- [ ] Add the consumer-facing hook behavior change to the CHANGELOG while preserving the existing successful-session behavior.

## Out of scope

- Non-`Error` throws bypassing `onError`, usage aggregation across tool rounds, and changes to successful-session hook ordering.