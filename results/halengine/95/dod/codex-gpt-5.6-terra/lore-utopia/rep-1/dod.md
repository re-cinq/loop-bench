# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point, and a provider rejection reaches its catch block without a new seam.

## Done when these pass

- [ ] **calls onError once with an Error caused by each non-Error rejection and rethrows the original value** — string, plain-object, and `undefined` provider rejections notify `onError` with a wrapping `Error` whose cause preserves the value, while callers receive that original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-`Error` rejections only for `onError`, retaining the original value for the rethrow.
- [ ] Replace the recorded-flaw statement in the config-hooks spec with this guarantee and add the existing-consumer impact to the CHANGELOG.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.