# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real `AIProvider`, providing a direct seam to trigger provider rejections and observe both the hook and caller boundary.

## Done when these pass

- [ ] **onError for non-Error provider rejections** — string, plain object, and `undefined` each call `onError` once with an `Error` whose `cause` is the original value, while the caller receives that value unchanged.
  `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Characterize each stated non-Error rejection through the orchestrator and assert hook and caller behavior.
- [ ] Replace the spec's recorded flaw with the new guarantee and document the consumer-visible change in the changelog.

## Out of scope

- Rejections that are already `Error` instances; existing tests pin their unchanged behavior.
- `beforeSession` escaping the `try` and usage accounting across tool rounds (HALEngine#93).