# Definition of Done

> The orchestrator's catch gates onError on error instanceof Error. A rejection that is not an Error — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses onError entirely while still propagating to the caller.

**Strategy: `direct`** — A seam already exists in `ChatOrchestrator` through the `onError` hook. The acceptance tests can provide a provider that throws non-Error values and verify that `onError` is called with a wrapped `Error` and the caller still receives the original rejection.

## Done when these pass

- [x] **rejection with string calls onError with wrapped Error** — A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError.acceptance.test.ts`

- [x] **rejection with plain object calls onError with wrapped Error** — A provider rejecting with a plain object calls `onError` once, with an `Error` whose `cause` is that object, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError.acceptance.test.ts`

- [x] **rejection with undefined calls onError with wrapped Error** — A provider rejecting with `undefined` calls `onError` once, with an `Error` whose `cause` is `undefined`, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError.acceptance.test.ts`

- [x] **rejection with Error reaches onError as same instance** — A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper, pinned by the existing tests remaining unedited.
  `src/orchestration/onError.acceptance.test.ts`

## Facets

- [x] Create acceptance tests in `src/orchestration/onError.acceptance.test.ts`
- [x] Verify tests fail with the current implementation
- [ ] Update `src/orchestration/chatOrchestrator.ts` to wrap non-Error rejections (to be done in the next round)
- [x] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` (to be done in the next round)
## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)