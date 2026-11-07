# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point and can be called with a provider that rejects with a non-Error value. The seam exists and the test asserts the absent behaviour, so the red bar is immediate.

## Done when these pass

- [ ] **calls onError with wrapped Error when provider rejects with a string** — `onError` is called once, receives an `Error` whose `cause` is the original string, and the caller gets the original string unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with wrapped Error when provider rejects with a plain object** — same guarantee for a plain-object rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with wrapped Error when provider rejects with undefined** — same guarantee when the rejection value is `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts` catch block: replace `if (hooks?.onError && error instanceof Error)` with a branch that wraps non-Error values in `new Error('Non-Error rejection', {cause: error})` and calls `onError` unconditionally
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: replace the "Measured semantics — out of scope" section with the new guarantee (done in this DoD commit)
- [ ] Add a CHANGELOG entry describing the new behaviour for existing consumers

## Out of scope

- `beforeSession` escaping the outer `try` block (tracked separately)
- Usage accounting across tool rounds (HALEngine#93)
- Any change to what the caller receives — the original rejection value is re-thrown unchanged