# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the existing public behavior seam, and production's deterministic mock provider lets the failure path run without a test double.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting it unchanged** — A thrown `beforeSession` error reaches `onError` with the session and same error, then `afterSession`, while the caller receives that error unchanged.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` within the orchestrator's guarded lifecycle so its failure reaches `onError` and `afterSession`.
- [x] Document that `afterSession` may run after `beforeSession` starts but does not complete, so cleanup must tolerate partial initialization.
- [ ] Add changelog guidance for existing consumers describing the new failure-path behavior.
- [ ] Keep the existing non-throwing `beforeSession` tests unedited and green.

## Out of scope

- Non-`Error` thrown values and usage accounting across tool rounds.