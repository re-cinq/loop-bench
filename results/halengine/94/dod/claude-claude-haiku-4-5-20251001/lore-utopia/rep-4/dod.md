# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw there escapes before the `catch`/`finally` exist and skips both `onError` and `afterSession`.

**Strategy: `direct`** — A seam already exists: `beforeSession` is a hook in the orchestrator. The acceptance tests can call the real entry point (`processMessage`) and observe that the hooks fire or don't fire when `beforeSession` throws, which is directly testable behaviour.

## Done when these pass

- [ ] **calls onError when beforeSession throws** — verifies that when `beforeSession` throws an error, the `onError` hook is called with that error
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **calls afterSession when beforeSession throws** — verifies that when `beforeSession` throws an error, the `afterSession` hook is still called
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **calls onError and afterSession in correct order when beforeSession throws** — verifies that both hooks fire in the correct order (onError then afterSession) when `beforeSession` throws
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

- [ ] **non-throwing beforeSession still works as before** — verifies that existing behaviour is preserved when `beforeSession` doesn't throw
  `src/orchestration/beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the try block so errors from it are caught
- [ ] Verify onError hook fires for beforeSession throws
- [ ] Verify afterSession hook fires for beforeSession throws
- [ ] Verify the error still propagates to the caller
- [ ] Verify non-throwing beforeSession maintains existing behaviour
- [ ] Update spec with new guarantee about afterSession running after failed beforeSession

## Out of scope

- The `instanceof Error` gate on `onError` (tracked separately)
- Usage accounting across tool rounds (HALEngine#93)
- Changes to other hooks or orchestration logic unrelated to beforeSession error handling