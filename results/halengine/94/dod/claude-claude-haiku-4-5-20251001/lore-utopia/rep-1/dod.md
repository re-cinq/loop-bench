# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam already exists: `beforeSession` is called at the entry point of `processMessageStream` at line 91 of `chatOrchestrator.ts`. The acceptance tests call the real entry point and verify the current behaviour (error propagates, `onError` and `afterSession` do not fire), establishing the red bar. The fix is to move the call inside the try block.

## Done when these pass

- [ ] **error from beforeSession still reaches the caller as a rejection** — verifies the error propagates unchanged to the caller
      `src/orchestration/chatOrchestrator.beforeSession-error.acceptance.test.ts`

- [ ] **onError fires for beforeSession throw** — verifies `onError` receives the error when `beforeSession` throws
      `src/orchestration/chatOrchestrator.beforeSession-error.acceptance.test.ts`

- [ ] **afterSession fires for beforeSession throw** — verifies `afterSession` executes even when `beforeSession` throws
      `src/orchestration/chatOrchestrator.beforeSession-error.acceptance.test.ts`

- [ ] **both onError and afterSession fire for beforeSession throw** — verifies both hooks fire in the correct order
      `src/orchestration/chatOrchestrator.beforeSession-error.acceptance.test.ts`

- [ ] **non-throwing beforeSession behaves exactly as today** — verifies the happy path is unchanged
      `src/orchestration/chatOrchestrator.beforeSession-error.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the try block in `src/orchestration/chatOrchestrator.ts`
- [ ] Update spec to reflect new guarantee that `afterSession` runs even when `beforeSession` throws
- [ ] Update CHANGELOG to document the change

## Out of scope

- The `instanceof Error` gate on `onError` (a separate issue)
- Usage accounting across tool rounds
- Changes to the hook firing order for other error scenarios