# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator seam exists today; the acceptance test calls the real `processMessage` entry point through `createChatOrchestrator` and fails because `beforeSession` is called before the try block and thus its throw escapes the catch/finally handlers. Moving the call inside the try block will make these tests pass.

## Done when these pass

- [ ] **beforeSession throw reaches the caller as a rejection** — Error propagates unchanged through the orchestrator, maintaining the existing contract with callers
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **onError fires when beforeSession throws** — The error hook observes all failures including beforeSession, with the same error object passed as any other orchestrator failure
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — The cleanup hook runs after beforeSession fails, allowing deployers to release resources allocated by the (failed) hook
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **all three hooks fire when beforeSession throws** — Verifies the complete call order: beforeSession → onError → afterSession, confirming catch and finally blocks are reached
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts`

## Out of scope

- The `instanceof Error` gate on `onError` (HALEngine#92, separate issue)
- Usage accounting across tool rounds (HALEngine#93)
- Updating the spec or CHANGELOG (handled separately per ticket acceptance criteria)