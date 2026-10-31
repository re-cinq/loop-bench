# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point and accepts a provider whose stream can reject with each reported value. The acceptance test observes both the hook and the caller boundary through that seam.

## Done when these pass

- [ ] **calls onError once for each non-Error rejection while preserving the caller rejection** — string, plain-object, and `undefined` rejections each notify the hook with an `Error` whose cause is the original value, while the caller receives that original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Dispatch every caught rejection to `onError`; wrap only non-`Error` values with their original value as `cause` and rethrow the original value.
- [ ] Replace the recorded-flaw statement in the config-hooks spec with this guarantee and add the consumer-facing migration note to `CHANGELOG.md`.

## Out of scope

- Error-instance identity, which existing tests already pin.
- `beforeSession` escaping the `try` and usage accounting across tool rounds.