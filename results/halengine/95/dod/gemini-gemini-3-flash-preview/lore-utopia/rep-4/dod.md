# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator already has an `onError` hook and a `catch` block. I can write acceptance tests that provide a provider or hook that rejects with non-Error values and assert that `onError` is called with a wrapped error.

## Done when these pass

- [ ] **calls onError for string rejection** — A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original string.
      `src/orchestration/onError-non-error.acceptance.test.ts`
- [ ] **calls onError for object rejection** — A provider rejecting with a plain object calls `onError` with an `Error` whose `cause` is that object, and the caller receives the original object.
      `src/orchestration/onError-non-error.acceptance.test.ts`
- [ ] **calls onError for undefined rejection** — A provider rejecting with `undefined` calls `onError` with an `Error` whose `cause` is `undefined`, and the caller receives `undefined`.
      `src/orchestration/onError-non-error.acceptance.test.ts`
- [ ] **calls onError for null rejection** — A provider rejecting with `null` calls `onError` with an `Error` whose `cause` is `null`, and the caller receives `null`.
      `src/orchestration/onError-non-error.acceptance.test.ts`
- [ ] **passes Error instance directly to onError** — A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper.
      `src/orchestration/onError-non-error.acceptance.test.ts`

## Facets

- [x] Create acceptance tests for non-Error rejections (string, object, undefined, null)
- [x] Verify tests fail because non-Error rejections bypass the `onError` hook
- [ ] Update `src/orchestration/chatOrchestrator.ts` to wrap non-Error rejections
- [x] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md`

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)