# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The `chatOrchestrator` already has a `try/catch` block that calls `onError`. I will add a new acceptance test file that uses a provider rejecting with non-Error values and asserts that `onError` is called with a wrapped Error.

## Done when these pass

- [ ] **wraps non-Error rejections and calls onError** — A provider rejecting with a string, plain object, or undefined calls `onError` once with an `Error` whose `cause` is the original rejection, while the caller receives the original rejection.
  `src/orchestration/onError-non-error.acceptance.test.ts`

## Facets

- [ ] Create `src/orchestration/onError-non-error.acceptance.test.ts` with tests for string, object, and undefined rejections.
- [ ] Update `src/orchestration/chatOrchestrator.ts` to wrap non-Error rejections before calling `onError`.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [ ] Update `CHANGELOG.md`.

## Out of scope

- `beforeSession` escaping the `try` (HALEngine#94).
- Usage accounting across tool rounds (HALEngine#93).