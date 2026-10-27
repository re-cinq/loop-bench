# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts an injected provider, so the acceptance test can exercise the rejection path and `onError` seam without mocks or production changes.

## Done when these pass

- [ ] **calls onError with an Error for a rejection containing a string, plain object, or undefined and preserves it for the caller** — every non-Error provider rejection invokes `onError` once with an `Error` whose `cause` is the original value, while the caller receives that original value unchanged.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Add the smallest real-entry-point regression test for non-Error provider rejections.
- [ ] Keep the existing Error-instance behavior covered by the unedited orchestrator tests.
- [ ] Update the config-hooks spec wording and changelog during implementation.

## Out of scope

- `beforeSession` escaping the `try`.
- Usage accounting across tool rounds (HALEngine#93).
- The production implementation, spec wording, changelog, and full CI checklist; those belong to the implementation round.