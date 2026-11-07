# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The `chatOrchestrator` is the entry point and it has a hooks seam. We can inject a provider that rejects with various types and verify if `onError` is called.

## Done when these pass

- [x] **calls onError for a string rejection** — A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original rejection unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **calls onError for a plain object rejection** — A provider rejecting with a plain object calls `onError` once, with an `Error` whose `cause` is that object, and the caller still receives the original rejection unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **calls onError for an undefined rejection** — A provider rejecting with `undefined` calls `onError` once, with an `Error` whose `cause` is `undefined`, and the caller still receives the original rejection unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **calls onError for an Error instance rejection** — A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [x] Create `src/orchestration/chatOrchestrator.acceptance.test.ts` with failing tests.
- [x] Update `specs/hal-engine-config-hooks/spec.md` to reflect the new guarantee.
- [x] Update `CHANGELOG.md` with the change.
- [x] Run `scripts/spec-links/reanchor.mjs` if it exists.

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)