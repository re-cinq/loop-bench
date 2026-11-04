# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The entry point already exists: `src/orchestration/chatOrchestrator.ts#processMessageStream` has a try/catch/finally structure. Moving the `beforeSession` call inside the try block ensures throws reach both the catch (for `onError`) and finally (for `afterSession`).

## Done when these pass

- [ ] **onError fires when beforeSession throws** — Validates that `onError` hook executes when `beforeSession` fails
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — Validates that `afterSession` hook executes when `beforeSession` fails
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts`

- [ ] **beforeSession throw reaches caller as rejection** — Validates the error still propagates to the caller
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts`

- [ ] **both onError and afterSession fire in correct order when beforeSession throws** — Validates hook execution order matches the documented contract
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts`

- [ ] **non-throwing beforeSession still works as before** — Validates the change does not break existing behaviour when `beforeSession` succeeds
  `src/orchestration/beforeSession-error-handling.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the try block in `chatOrchestrator.ts#L91`
- [ ] Update spec to document the new guarantee that `onError` and `afterSession` fire when `beforeSession` throws

## Out of scope

- The `instanceof Error` gate on `onError` (issue #92)
- Usage accounting across tool rounds (issue #93)