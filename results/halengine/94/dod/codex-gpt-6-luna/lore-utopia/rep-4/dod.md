# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts lifecycle hooks directly. A single failure-path test can observe the rejection and both hooks with their real arguments.

## Done when these pass

- [ ] **beforeSession failure still rejects and runs both failure hooks** — the original error reaches the caller; `onError` receives the session and error, and `afterSession` runs afterward with the session.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the guarded lifecycle so its failure runs `onError` and `afterSession`.
- [ ] Document that after a failed `beforeSession`, setup may be incomplete and cleanup must account for resources that were never allocated.
- [ ] Add a consumer-facing CHANGELOG entry for the corrected failure behavior.

## Out of scope

- The `instanceof Error` gate for `onError`.
- Usage accounting across tool rounds (HALEngine#93).