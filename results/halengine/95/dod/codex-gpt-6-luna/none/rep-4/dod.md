# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point used by provider calls, and its catch path runs the configured `onError` hook. The acceptance test exercises that path with actual provider rejections.

## Done when these pass

- [ ] **Reports wrapped hook errors and preserves caller rejections** — string, plain object, and `undefined` each invoke `onError` once with an `Error` whose cause is the original value, while the caller receives that value unchanged.
  `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Wrap non-`Error` rejection values for `onError` while preserving the original thrown value for the caller.
- [ ] Replace the measured flaw in the hook spec with the guarantee and link the acceptance test.

## Out of scope

- Already-`Error` rejections, `beforeSession` escaping the `try`, usage accounting across tool rounds, and consumer-facing changelog edits.