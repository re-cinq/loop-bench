# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator already exposes a `hooks` configuration with an `onError` hook. We can provide a mock provider that rejects with various types and verify if `onError` is called and if the caller receives the original rejection.

## Done when these pass

- [ ] **calls onError for string rejection** — A provider rejecting with a string calls `onError` once with an `Error` whose `cause` is that string, and the caller still receives the original string.
      `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for object rejection** — A provider rejecting with a plain object calls `onError` once with an `Error` whose `cause` is that object, and the caller still receives the original object.
      `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for undefined rejection** — A provider rejecting with `undefined` calls `onError` once with an `Error` whose `cause` is `undefined`, and the caller still receives `undefined`.
      `src/orchestration/onError.acceptance.test.ts`
- [ ] **passes Error instances unchanged** — A provider rejecting with an `AIError` (which is an `Error`) calls `onError` once with the exact same instance.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [x] Write acceptance tests in `src/orchestration/onError.acceptance.test.ts`
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee
- [x] Update `CHANGELOG.md` with the change for consumers

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)