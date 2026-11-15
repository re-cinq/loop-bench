# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The `beforeSession` call exists at line 91 of `chatOrchestrator.ts`, immediately before the try block. The fix is to move it inside the try block, where exceptions will be caught by the existing error handling path that calls `onError` and the finally block that calls `afterSession`.

## Done when these pass

- [ ] **beforeSession throwing still propagates to caller as rejection** — Error thrown from `beforeSession` reaches the caller unchanged
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **onError fires when beforeSession throws** — `onError` hook is called with the thrown error
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` hook is called after a `beforeSession` throw
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **onError and afterSession both fire when beforeSession throws** — Both hooks fire in the correct order when `beforeSession` throws
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] Existing tests remain unedited and pass — Non-throwing `beforeSession` behavior unchanged

## Facets

- [ ] Move `beforeSession` call inside the `try` block
- [ ] Verify `onError` and `afterSession` fire correctly on `beforeSession` throw
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded flaw with the new guarantee
- [ ] Ensure all checks pass: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check`

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)