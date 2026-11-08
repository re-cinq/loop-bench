# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — I will write acceptance tests that use `createChatOrchestrator` to simulate a `beforeSession` throw and verify that `onError` and `afterSession` are called.

## Done when these pass

- [ ] **runs onError when beforeSession throws** — Verifies that a throw in `beforeSession` is caught and passed to `onError`.
      `src/orchestration/chatOrchestrator.hooks.acceptance.test.ts`
- [ ] **runs afterSession when beforeSession throws** — Verifies that `afterSession` is executed even if `beforeSession` throws.
      `src/orchestration/chatOrchestrator.hooks.acceptance.test.ts`

## Facets

- [x] Create `src/orchestration/chatOrchestrator.hooks.acceptance.test.ts` with failing tests.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.

## Out of scope

- `instanceof Error` gate on `onError` (its own issue).
- usage accounting across tool rounds (HALEngine#93).