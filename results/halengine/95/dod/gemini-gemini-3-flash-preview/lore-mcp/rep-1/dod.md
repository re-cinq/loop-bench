# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator's `processMessage` can be called with a provider that rejects with various types. The acceptance tests will verify that `onError` is called with an `Error` instance (wrapping non-Error values) and that the original rejection is re-thrown to the caller.

## Done when these pass

- [ ] **rejects with a string calls onError with a wrapped Error** — A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError-rejection.acceptance.test.ts`
- [ ] **rejects with a plain object calls onError with a wrapped Error** — A provider rejecting with a plain object calls `onError` once, with an `Error` whose `cause` is that object, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError-rejection.acceptance.test.ts`
- [ ] **rejects with undefined calls onError with a wrapped Error** — A provider rejecting with `undefined` calls `onError` once, with an `Error` whose `cause` is `undefined`, and the caller still receives the original rejection unchanged.
  `src/orchestration/onError-rejection.acceptance.test.ts`
- [ ] **rejects with an Error instance calls onError with the same instance** — A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper.
  `src/orchestration/onError-rejection.acceptance.test.ts`

## Facets

- [x] Create acceptance tests and verify they fail for non-Error rejections.
- [ ] Update `src/orchestration/chatOrchestrator.ts` to call `onError` for all rejections, wrapping non-Error values.
- [x] Update `specs/hal-engine-config-hooks/spec.md` with the new guarantee.
- [x] Update `CHANGELOG.md`.

## Out of scope

- `beforeSession` escaping the `try`.
- Usage accounting across tool rounds.