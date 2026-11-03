# Definition of Done

> beforeSession is awaited before the try block opens, so a throw from it escapes before the catch and finally exist. Neither onError nor afterSession runs.

**Strategy: `direct`** — The `processMessage` and `processMessageStream` methods are the real entry points. The acceptance tests call them directly and verify that when `beforeSession` throws, the error is caught by the try/catch/finally block so that `onError` and `afterSession` fire as they should.

## Done when these pass

- [ ] **error reaches the caller as a rejection** — A thrown error from beforeSession reaches the caller unchanged
  `src/orchestration/beforeSessionHooks.acceptance.test.ts`

- [ ] **onError fires with the thrown error** — The onError hook is called when beforeSession throws
  `src/orchestration/beforeSessionHooks.acceptance.test.ts`

- [ ] **afterSession fires after beforeSession throws** — The afterSession hook runs even when beforeSession throws
  `src/orchestration/beforeSessionHooks.acceptance.test.ts`

- [ ] **hooks fire in order: beforeSession -> onError -> afterSession** — The hooks execute in the correct order when beforeSession throws
  `src/orchestration/beforeSessionHooks.acceptance.test.ts`

- [ ] **error still propagates after onError and afterSession run** — The error propagates to the caller after all hooks have run
  `src/orchestration/beforeSessionHooks.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the try block in `src/orchestration/chatOrchestrator.ts` (line 91 moves to after line 93)

## Out of scope

- The `instanceof Error` gate on `onError` (issue #94 mentions this as out of scope)
- Usage accounting across tool rounds (separate issue)
- Spec and CHANGELOG updates (mentioned in acceptance criteria but handled in production code change)