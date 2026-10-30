# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` already exposes the failure and lifecycle-hook behavior through the real orchestrator entry point.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting with it** — A `beforeSession` error reaches `onError` and `afterSession` with the same session and error before being rethrown unchanged, without starting the next turn stage.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's protected lifecycle region.
- [ ] Preserve the original `beforeSession` rejection after `onError` and `afterSession` run.
- [ ] Document that `afterSession` may run after `beforeSession` starts but does not complete.
- [ ] Add the consumer-visible lifecycle change to the CHANGELOG.
- [ ] Keep the existing non-throwing lifecycle tests unedited and green.

## Out of scope

- Non-`Error` thrown values and usage accounting across tool rounds.