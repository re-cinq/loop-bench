# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(session)` is the existing lifecycle entry point. The acceptance test drives a real configured turn whose `beforeSession` hook rejects.

## Done when these pass

- [ ] **reports the original error and always cleans up after the failed hook** — a `beforeSession` rejection reaches the caller unchanged while `onError` and `afterSession` receive the failed session in lifecycle order.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestration `try` block.
- [ ] Preserve the original rejection after `onError` and `afterSession` finish.
- [ ] Keep the specification's failed-setup guarantee and release note aligned with the behavior.

## Out of scope

- Reporting non-`Error` rejections through `onError`.
- Usage accounting across tool rounds.