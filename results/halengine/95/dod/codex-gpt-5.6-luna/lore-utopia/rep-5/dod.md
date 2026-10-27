# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` returns an orchestrator whose `processMessage` is the real entry point, and a provider that rejects drives the catch directly. No mock or new seam is needed.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — string, plain-object, and `undefined` provider rejections each call `onError` once with an `Error` carrying the original as `cause`, while the caller receives the original value unchanged.
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Red: the acceptance test fails because the current `instanceof Error` gate skips all three non-Error rejections.
- [ ] Green: wrap only non-`Error` rejections for `onError`, preserving the original re-thrown value.
- [ ] Refactor: leave the existing Error-path tests green and unedited, including same-instance delivery.
- [ ] Documentation: replace the recorded-flaw spec line and describe the consumer-visible change in the changelog.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Changing the rejection value observed by the caller.