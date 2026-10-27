# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point and already exposes the provider rejection path and `onError` hook. The acceptance test drives that seam with non-Error provider rejections.

## Done when these pass

- [ ] **calls onError with an Error for every non-Error rejection while preserving the caller rejection** — a string, plain object, and `undefined` rejection each call `onError` once with an `Error` whose `cause` is the original value, while the caller receives that exact original value
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Add the smallest direct acceptance test for non-Error rejection wrapping and unchanged propagation.
- [ ] Keep the existing Error-instance behavior covered by the existing orchestrator tests without editing them.
- [ ] Update the spec from the measured flaw to the guaranteed hook behavior and add the consumer-facing changelog entry.

## Out of scope

- `beforeSession` escaping the `try`.
- Usage accounting across tool rounds.
- Changing the caller-visible shape of an already thrown `Error`.