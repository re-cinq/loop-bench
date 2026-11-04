# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — The seam already exists: the `catch` block in `chatOrchestrator.ts` wraps the try-finally structure that contains all error-throwing paths. A rejection that is not an Error merely needs to be wrapped before calling onError, without changing what is re-thrown to the caller.

## Done when these pass

- [ ] **Non-Error string rejection wraps in Error with cause and calls onError** — A provider rejecting with a string calls `onError` once with an Error whose `cause` is the string; the caller receives the original rejection unchanged
  `src/orchestration/chatOrchestrator.onError-non-error.acceptance.test.ts`

- [ ] **Non-Error plain object rejection wraps in Error with cause and calls onError** — A rejection with a plain object results in onError receiving an Error wrapper with the object as `cause`; caller receives the original unchanged
  `src/orchestration/chatOrchestrator.onError-non-error.acceptance.test.ts`

- [ ] **Undefined rejection wraps in Error with cause and calls onError** — A rejection with `undefined` results in onError receiving an Error wrapper with `undefined` as `cause`; caller receives original `undefined`
  `src/orchestration/chatOrchestrator.onError-non-error.acceptance.test.ts`

- [ ] **Error rejection reaches onError as same instance** — A rejection that is already an Error reaches onError as the same instance, not a wrapper, pinned by existing tests remaining unedited
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Modify catch block to wrap non-Error rejections in Error with cause preservation
- [ ] Verify existing tests still pass (Error path unchanged)
- [ ] Run all tests including the new acceptance tests

## Out of scope

- `beforeSession` escaping the `try` (HALEngine#92)
- Usage accounting across tool rounds (HALEngine#93)
- Changes to specs or CHANGELOG (these follow if implementation succeeds)