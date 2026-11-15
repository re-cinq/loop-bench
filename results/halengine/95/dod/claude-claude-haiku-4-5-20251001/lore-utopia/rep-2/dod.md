# Definition of Done

> Call `onError` for a rejection that is not an Error

**Strategy: `direct`** — The catch block in `chatOrchestrator.ts` already exists and
is the right seam. The fix gates `onError` on whether the hook exists, not on `error instanceof Error`,
and wraps non-Error rejections in an Error with the original as `cause`.

## Done when these pass

- [ ] **String rejection triggers onError with wrapped Error** — Provider rejects with a string; orchestrator calls `onError` once with an Error whose `cause` is that string; caller receives the original string unchanged
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

- [ ] **Plain object rejection triggers onError with wrapped Error** — Provider rejects with a plain object; orchestrator calls `onError` once with an Error whose `cause` is that object; caller receives the original object unchanged
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

- [ ] **Undefined rejection triggers onError with wrapped Error** — Provider rejects with `undefined`; orchestrator calls `onError` once with an Error whose `cause` is `undefined`; caller receives the original `undefined` unchanged
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

- [ ] **Error rejection passes through without wrapping** — Provider rejects with an Error instance; orchestrator calls `onError` once with the same Error instance; caller receives the same Error instance
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] Modify the catch block to check existence of `onError` hook instead of `error instanceof Error`
- [ ] When caught error is not an Error, wrap it in an Error with the original as `cause`
- [ ] Re-throw the original rejection value (not the wrapper) to the caller
- [ ] Ensure all acceptance tests pass
- [ ] Verify existing tests remain unedited and pass (Error path tests unchanged)
- [ ] Format code with prettier
- [ ] Commit changes

## Out of scope

- Spec update (specs/hal-engine-config-hooks/spec.md) — the spec maintenance and link reanchoring
- CHANGELOG update — version and changelog management
- Full CI suite verification (npm run build, npm run typecheck, npm run eslint) — CI will verify on push