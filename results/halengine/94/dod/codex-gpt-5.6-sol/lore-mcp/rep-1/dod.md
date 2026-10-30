# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real public orchestration seam and accepts lifecycle hooks directly. One failure-path test observes the rejection and both cleanup hooks together while existing tests retain ownership of the non-throwing path.

## Done when these pass

- [ ] **rejects unchanged after onError and afterSession receive the failed session** — a thrown `beforeSession` error reaches `onError` with the session, then `afterSession` with that same session, and is still the rejection seen by the caller.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the orchestrator's protected lifecycle so its failure reaches `onError` and `afterSession` in order.
- [ ] Document that `afterSession` may receive a session whose `beforeSession` hook began but did not complete, so cleanup must tolerate partial setup.
- [ ] Add the consumer-visible hook lifecycle change to the changelog.
- [ ] Keep the existing non-throwing lifecycle tests unedited and green.

## Out of scope

- Non-`Error` throws and usage accounting across tool rounds.