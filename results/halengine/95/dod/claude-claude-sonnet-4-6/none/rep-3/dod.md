# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point and the `catch` block at `src/orchestration/chatOrchestrator.ts:L150` is the exact seam. Tests inject a provider that rejects with a non-Error value and assert on the `onError` hook.

## Done when these pass

- [ ] **calls onError when the provider rejects with a string, passing an Error whose cause is that string, and re-throws the original string** — onError is called once; the argument is an Error with `.cause === 'something went wrong'`; the promise rejects with the original string
  `src/orchestration/onErrorNonError.acceptance.test.ts`

- [ ] **calls onError when the provider rejects with a plain object, passing an Error whose cause is that object, and re-throws the original object** — onError is called once; the argument is an Error with `.cause === original`; the promise rejects with the original object
  `src/orchestration/onErrorNonError.acceptance.test.ts`

- [ ] **calls onError when the provider rejects with undefined, passing an Error whose cause is undefined, and re-throws undefined** — onError is called once; the argument is an Error with `.cause` undefined; the promise rejects with undefined
  `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Remove the `instanceof Error` guard in the `catch` block of `processMessageStream` (`chatOrchestrator.ts:L150`); wrap non-Error rejections in `new Error('Non-Error rejection', {cause: error})` before passing to `onError`; re-throw the original value unchanged
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: replace the "Measured semantics — out of scope" section with the new guarantee (every rejection calls `onError`; non-Error values are wrapped with original as `cause`), and add `([validated by ...])` traceability links to the new tests
- [ ] Add a CHANGELOG entry describing the change for existing consumers
- [ ] Confirm existing `onError` tests (the `instanceof Error` path) remain green, proving Error instances are passed as-is not wrapped

## Out of scope

- `beforeSession` escaping the outer `try` block (its own issue)
- Usage accounting across tool rounds (HALEngine#93)