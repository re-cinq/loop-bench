# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam already exists in `src/orchestration/chatOrchestrator.ts` at lines 90-93. The fix is to move the `beforeSession` call inside the `try` block so that when it throws, it reaches the same `catch` and `finally` as any other failure.

## Done when these pass

- [ ] **rejection from beforeSession reaches caller** — A `beforeSession` that throws still propagates a rejection to the caller (unchanged behavior)
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

- [ ] **onError fires when beforeSession throws** — When `beforeSession` throws, the `onError` hook is called with the error
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — When `beforeSession` throws, the `afterSession` hook is called
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

- [ ] **full hook lifecycle when beforeSession throws** — The complete hook order is: `beforeSession` throws → `onError` → `afterSession`, with no intermediate hooks called
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

- [ ] **afterSession fires even when both beforeSession and onError throw** — The `afterSession` hook runs even when both `beforeSession` and `onError` throw
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the `try` block (line 91 moves into the try on line 93)
- [ ] Verify existing tests remain unedited and passing to ensure non-throwing `beforeSession` behaves exactly as today
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the "measured flaw" line with the new guarantee
- [ ] Update CHANGELOG to document the behavior change

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Changes to tool budget or other orchestration logic beyond `beforeSession` placement