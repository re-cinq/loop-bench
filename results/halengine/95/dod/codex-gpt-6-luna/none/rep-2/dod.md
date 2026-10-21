# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` and its `processMessage` entry point are the real seam. A provider can reject with arbitrary values, so the acceptance test can observe both hook delivery and the unchanged caller rejection.

## Done when these pass

- [ ] **onError for non-Error provider rejections** — string, plain object, and `undefined` rejections call `onError` once with an `Error` whose `cause` is the original value, while the caller receives that exact value.
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Pin all specified non-Error rejection values through the real orchestrator entry point.
- [ ] Replace the spec's recorded flaw with the new guarantee and link it to the acceptance test.

## Out of scope

- Whether `beforeSession` runs inside the `try` block.
- Usage accounting across tool rounds (HALEngine#93).
- Documentation and changelog updates beyond the traceability change to the spec.