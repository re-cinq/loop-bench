# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The orchestrator's `processMessage` method is the public entry point; tests can call it directly and assert that hooks fire for a `beforeSession` throw.

## Done when these pass

- [ ] **when beforeSession throws, the error reaches the caller as a rejection** — verifies the throw still propagates unchanged to the caller
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **when beforeSession throws, onError fires with that error** — verifies the `catch` block runs and calls `onError`
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **when beforeSession throws, afterSession still fires** — verifies the `finally` block runs and calls `afterSession`
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` block so its throw reaches the `catch` and `finally`
- [ ] Verify existing tests pass (non-throwing `beforeSession` behavior unchanged)

## Out of scope

- The `instanceof Error` gate on `onError` (HALEngine#95)
- Usage accounting across tool rounds (HALEngine#93)
- Spec updates and CHANGELOG (ownership unclear; this ticket pins the behaviour)