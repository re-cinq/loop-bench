# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — A seam already exists: the orchestrator's `processMessageStream` generator function has a try/catch/finally structure. The acceptance tests can call the real entry point today and fail on the current behaviour (beforeSession outside try), then pass once the call is moved inside.

## Done when these pass

- [ ] **beforeSession error reaches the caller as a rejection** — the error thrown from beforeSession still propagates to the caller, unchanged from today's behavior
  `src/orchestration/beforeSessionError.acceptance.test.ts`

- [ ] **beforeSession error triggers onError hook** — when beforeSession throws, the onError hook is called with the error
  `src/orchestration/beforeSessionError.acceptance.test.ts`

- [ ] **beforeSession error triggers afterSession hook** — when beforeSession throws, the afterSession hook is called
  `src/orchestration/beforeSessionError.acceptance.test.ts`

- [ ] **beforeSession error triggers both onError and afterSession in correct order** — when beforeSession throws, both hooks fire and onError fires before afterSession
  `src/orchestration/beforeSessionError.acceptance.test.ts`

- [ ] **non-throwing beforeSession behaves the same as before** — the existing behavior for a non-throwing beforeSession is unchanged, pinned by this test verifying the full hook order
  `src/orchestration/beforeSessionError.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` (line 91)
- [ ] Verify all acceptance tests pass
- [ ] Verify existing orchestration tests still pass (no regression)
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to document the new guarantee for when beforeSession throws

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (issue #93)
- Changes to other hooks or lifecycle behavior