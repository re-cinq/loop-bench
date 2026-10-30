# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real entry point and already exposes the failure from `beforeSession`, so one acceptance scenario can observe rejection and both lifecycle hooks directly.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting with the original error** — a `beforeSession` error reaches `onError` with the session and original error, then reaches `afterSession`, and is finally rethrown unchanged to the caller.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's protected lifecycle so its failure reaches `onError` and `afterSession`.
- [ ] Preserve the original `beforeSession` error as the caller-visible rejection.
- [ ] Document that `afterSession` may receive a session whose initialization only partially completed.
- [ ] Add the consumer-visible hook lifecycle change to the CHANGELOG.

## Out of scope

- Non-`Error` thrown values and the `instanceof Error` gate on `onError`.
- Usage accounting across tool rounds.
- Changes to the already-pinned successful `beforeSession` lifecycle.