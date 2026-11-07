# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator already has the `onError` hook seam. I've added a new acceptance test file `src/orchestration/onError.acceptance.test.ts` that exercises the orchestrator with providers that reject with various non-Error values, asserting that the hook is called with a wrapped Error while the original rejection is preserved for the caller.

## Done when these pass

- [ ] **calls onError for string rejection** — A provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still receives the original rejection unchanged
      `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for object rejection** — A provider rejecting with a plain object calls `onError` once, with an `Error` whose `cause` is that object, and the caller still receives the original rejection unchanged
      `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for undefined rejection** — A provider rejecting with `undefined` calls `onError` once, with an `Error` whose `cause` is `undefined`, and the caller still receives the original rejection unchanged
      `src/orchestration/onError.acceptance.test.ts`
- [ ] **calls onError for null rejection** — A provider rejecting with `null` calls `onError` once, with an `Error` whose `cause` is `null`, and the caller still receives the original rejection unchanged
      `src/orchestration/onError.acceptance.test.ts`
- [ ] **passes through Error rejection** — A rejection that is already an `Error` reaches `onError` as the same instance, not a wrapper, pinned by the existing tests remaining unedited
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Write acceptance tests in `src/orchestration/onError.acceptance.test.ts`
- [ ] Verify they fail for the right reason (onError not called for non-Error rejections)
- [ ] Update `specs/hal-engine-config-hooks/spec.md` with new guarantee
- [ ] Update `CHANGELOG.md`
- [ ] Run `node scripts/repoint-spec-anchors.mjs` to align spec links

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- usage accounting across tool rounds (HALEngine#93)