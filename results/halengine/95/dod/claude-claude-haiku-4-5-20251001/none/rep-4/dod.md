# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists in `src/orchestration/chatOrchestrator.ts` lines 150–152 in the catch block. The acceptance tests can call the orchestrator directly and verify the behavior through hook observation.

## Done when these pass

- [ ] **string rejection calls onError with wrapped Error** — A provider rejecting with a string calls `onError` once with an `Error` whose `cause` is that string, and the caller still receives the original string unchanged
  `src/orchestration/chatOrchestrator.onError-non-errors.acceptance.test.ts`

- [ ] **plain object rejection calls onError with wrapped Error** — A provider rejecting with a plain object calls `onError` once with an `Error` whose `cause` is that object, and the caller still receives the original object unchanged
  `src/orchestration/chatOrchestrator.onError-non-errors.acceptance.test.ts`

- [ ] **undefined rejection calls onError with wrapped Error** — A provider rejecting with `undefined` calls `onError` once with an `Error` whose `cause` is `undefined`, and the caller still receives the original `undefined` unchanged
  `src/orchestration/chatOrchestrator.onError-non-errors.acceptance.test.ts`

- [ ] **Error instance rejection reaches onError as same instance** — A rejection that is already an `Error` reaches `onError` as the same instance, not wrapped, pinned by existing tests remaining unedited
  `src/orchestration/chatOrchestrator.onError-non-errors.acceptance.test.ts`

## Facets

- [ ] Modify the catch block in `src/orchestration/chatOrchestrator.ts` to wrap non-Error rejections in an Error with the original as the `cause`, call `onError` for every rejection, and re-throw the original value
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded-flaw line with the new guarantee

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)