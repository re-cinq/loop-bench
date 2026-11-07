# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The `ChatOrchestrator` already has an `onError` hook seam. The acceptance tests can provide a mock provider that rejects with non-Error values and verify that the `onError` hook is called as specified.

## Done when these pass

- [ ] **calls onError with a wrapped Error when provider rejects with a string** — A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original rejection unchanged.
      `src/orchestration/onError.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error when provider rejects with a plain object** — A provider rejecting with a plain object calls `onError` once, with an `Error` whose `cause` is that object, and the caller still receives the original rejection unchanged.
      `src/orchestration/onError.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error when provider rejects with undefined** — A provider rejecting with `undefined` calls `onError` once, with an `Error` whose `cause` is `undefined`, and the caller still receives the original rejection unchanged.
      `src/orchestration/onError.acceptance.test.ts`

- [ ] **calls onError with the same instance when provider rejects with an Error** — A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Create `src/orchestration/onError.acceptance.test.ts` with failing tests.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [ ] (Implicit in next rounds) Implement the fix in `src/orchestration/chatOrchestrator.ts`.
- [ ] (Implicit in next rounds) Update `CHANGELOG.md`.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).