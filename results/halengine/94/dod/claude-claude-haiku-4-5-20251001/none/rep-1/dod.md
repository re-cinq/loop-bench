# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The seam already exists. The `beforeSession` call lives in `src/orchestration/chatOrchestrator.ts` and can be moved inside the try block. Acceptance tests call the real orchestrator entry point and fail because the current implementation skips `onError` and `afterSession` when `beforeSession` throws.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — When `beforeSession` rejects with an Error, `onError` is called with that error as the second argument.
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — When `beforeSession` rejects, `afterSession` is called in the finally block, even though no normal turn happened.
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

- [ ] **error still propagates** — When `beforeSession` rejects, both `onError` and `afterSession` fire before the error reaches the caller, and the caller still receives the rejection.
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

- [ ] **non-throwing beforeSession behaves unchanged** — A `beforeSession` that does not throw fires at the same point in the lifecycle, before `beforeUserInput`, and existing tests pin this behavior unchanged.
  `src/orchestration/chatOrchestrator.beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` call inside the try block in `src/orchestration/chatOrchestrator.ts:91`
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to remove the "recorded flaw" note and document the new guarantee
- [ ] Update CHANGELOG to note the behaviour change for existing consumers
- [ ] Verify all CI checks pass: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint --max-warnings 0`, `npm run prettier:check`

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)