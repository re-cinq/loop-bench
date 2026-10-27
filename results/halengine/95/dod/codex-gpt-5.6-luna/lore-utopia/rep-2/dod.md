# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage(...)` is the real caller path and accepts an `AIProvider` whose stream can reject with any runtime value. The acceptance test drives that seam without mocks or stubs.

## Done when these pass

- [ ] **calls onError for non-Error provider rejections while preserving the caller rejection** — a string, plain object, or `undefined` rejection calls `onError` once with an `Error` whose `cause` is the original value, while the caller receives that original value unchanged
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Add the smallest real-entry-point test covering non-Error rejection values.
- [ ] Confirm the existing Error-path tests remain unedited and continue to pin same-instance delivery.
- [ ] Update the config-hooks spec from the recorded flaw to the guaranteed behavior and link the acceptance test.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds remain separate issues.
- Production implementation, changelog edits, and unrelated hook behavior are owned by the implementation round.