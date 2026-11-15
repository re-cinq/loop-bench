# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — The `catch` block in `src/orchestration/chatOrchestrator.ts` (line 149-153) gates `onError` on `error instanceof Error`. A seam exists: the catch can be modified to wrap non-Error rejections and still call the hook, preserving the original value in the `cause` property.

## Done when these pass

- [ ] **string rejection calls onError with wrapped Error** — A provider rejecting with a string calls `onError` once with an Error whose cause is that string, and the caller receives the original rejection unchanged
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

- [ ] **plain object rejection calls onError with wrapped Error** — A rejection with a plain object calls `onError` with an Error whose cause is that object, and the caller receives the original rejection unchanged
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

- [ ] **undefined rejection calls onError with wrapped Error** — A rejection with `undefined` calls `onError` with an Error whose cause is undefined, and the caller receives the original rejection unchanged
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

- [ ] **Error rejection unchanged** — A rejection that is already an Error reaches `onError` as the same instance without wrapping
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

## Facets

- [ ] Modify the `catch` block in `src/orchestration/chatOrchestrator.ts` to wrap non-Error rejections in an Error with the original as the `cause`
- [ ] Keep the re-thrown value at the caller boundary exactly what it is today
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded-flaw line with the new guarantee
- [ ] Update CHANGELOG to document the change for existing consumers
- [ ] Pass `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint --max-warnings 0`, and `npm run prettier:check`

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)