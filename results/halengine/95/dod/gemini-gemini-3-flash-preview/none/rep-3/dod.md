# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — A seam already exists in `createChatOrchestrator` which accepts `OrchestratorHooks` including `onError`. I can provide a mock provider that rejects with various types and assert that `onError` is called.

## Done when these pass

- [ ] **calls onError for string rejection** — A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for object rejection** — A provider rejecting with a plain object calls `onError` once, with an `Error` whose `cause` is that object, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for undefined rejection** — A provider rejecting with `undefined` calls `onError` once, with an `Error` whose `cause` is `undefined`, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for Error rejection** — A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper, pinned by the existing tests remaining unedited.
  `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Add acceptance tests for non-Error rejections
- [ ] Update `src/orchestration/chatOrchestrator.ts` to call `onError` for all rejections, wrapping non-Error values
- [ ] Update `specs/hal-engine-config-hooks/spec.md` with new guarantee
- [ ] Add CHANGELOG entry
- [ ] Verify with `reanchor.mjs` if available

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)