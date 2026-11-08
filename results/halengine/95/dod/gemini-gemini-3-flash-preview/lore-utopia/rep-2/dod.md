# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The `createChatOrchestrator` factory allows passing hooks, including `onError`. I can provide a mock provider that rejects with various non-Error values and verify that `onError` is called with the expected wrapped Error, while the caller receives the original rejection.

## Done when these pass

- [x] **calls onError with a wrapped Error when a provider rejects with a string** — A provider rejecting with a string should trigger `onError` with an `Error` whose `cause` is that string. The caller should receive the original string.
  `src/orchestration/onError.acceptance.test.ts`

- [x] **calls onError with a wrapped Error when a provider rejects with a plain object** — A provider rejecting with `{foo: 'bar'}` should trigger `onError` with an `Error` whose `cause` is that object. The caller should receive the original object.
  `src/orchestration/onError.acceptance.test.ts`

- [x] **calls onError with a wrapped Error when a provider rejects with undefined** — A provider rejecting with `undefined` should trigger `onError` with an `Error` whose `cause` is `undefined`. The caller should receive `undefined`.
  `src/orchestration/onError.acceptance.test.ts`

- [x] **calls onError with the original Error when a provider rejects with an Error** — A provider rejecting with an `Error` instance should trigger `onError` with that same instance (no wrapping).
  `src/orchestration/onError.acceptance.test.ts`

## Facets

- [x] Create `src/orchestration/onError.acceptance.test.ts` with the above tests.
- [x] Verify that all tests fail for the right reason (onError not called for non-Error rejections).
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [x] Add entry to `CHANGELOG.md`.


## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- usage accounting across tool rounds (HALEngine#93).