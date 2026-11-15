# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists in `src/orchestration/chatOrchestrator.ts` at the error handler (lines 149-153). The acceptance tests call `processMessage` through the real entry point and verify that the hook receives wrapped non-Error rejections.

## Done when these pass

- [ ] **String rejection calls onError with wrapped Error** — Verifies that when a provider rejects with a string, `onError` is called with an Error whose `cause` is that string, and the caller still receives the original string
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

- [ ] **Plain object rejection calls onError with wrapped Error** — Verifies that when a provider rejects with a plain object, `onError` is called with an Error whose `cause` is that object, and the caller still receives the original object
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

- [ ] **Undefined rejection calls onError with wrapped Error** — Verifies that when a provider rejects with `undefined`, `onError` is called with an Error whose `cause` is `undefined`, and the caller still receives `undefined`
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

- [ ] **Existing Error rejections remain unwrapped** — Verifies that when a provider rejects with an actual Error instance, `onError` receives that same instance (not wrapped), and the caller receives the original Error unchanged (validated by existing tests remaining unedited)
  `src/orchestration/onError-non-error-rejection.acceptance.test.ts`

## Facets

- [ ] Modify `src/orchestration/chatOrchestrator.ts` error handler to wrap non-Error rejections in Error instances with the original value as `cause`
- [ ] Ensure existing Error instances are passed through unchanged
- [ ] Ensure the original rejection value is re-thrown unchanged to the caller in all cases

## Out of scope

- Documentation updates and CHANGELOG changes (acceptance criterion 4 in the ticket)
- CI checks beyond the test passing (acceptance criterion 5 in the ticket)