# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point, and its hook options expose the failure without doubles. One acceptance test covers rejection, error delivery, cleanup, and their order.

## Done when these pass

- [ ] **reports a failed beforeSession and runs afterSession before rejecting with the same error** — A failed setup reaches `onError` and `afterSession` with the same session and error before the caller sees the original rejection, without starting later turn hooks.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the existing `try` so `catch` and `finally` cover its failure.
- [ ] Keep the original `Error` rejection after both hooks run, with the same hook argument shapes as other failures.
- [ ] Preserve the existing successful lifecycle behaviour and tests.
- [ ] Add a CHANGELOG entry explaining that failed setup now invokes `onError` and `afterSession` for consumers.
- [ ] Run the repository CI checks after implementation.

## Out of scope

- The `instanceof Error` gate for thrown values that are not `Error` objects.
- Usage accounting across tool rounds (HALEngine#93).