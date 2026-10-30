# Definition of Done

> Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts lifecycle hooks directly, so the failed `beforeSession` lifecycle is observable without a test double.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting with the same error** — pins the unchanged rejection and the `onError` then `afterSession` lifecycle, including the session and error arguments.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the turn's `try` so its error reaches `onError` and its cleanup reaches `afterSession`.
- [ ] Replace the recorded flaw in the config-hooks spec with the guarantee that cleanup may run before session setup completed.
- [ ] Add an Unreleased changelog entry describing the lifecycle change for hook consumers.

## Out of scope

- Non-`Error` thrown values and usage aggregation across tool rounds.