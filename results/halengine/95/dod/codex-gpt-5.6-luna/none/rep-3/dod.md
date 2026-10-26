# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts a provider plus lifecycle hooks, so the acceptance test can exercise the catch path directly.

## Done when these pass

- [ ] **calls onError for non-Error provider rejections while preserving the caller rejection** — every non-`Error` rejection calls `onError` once with an `Error` whose `cause` is the original value, while the caller receives that original value unchanged
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Add the red acceptance test for string, plain-object, and `undefined` provider rejections.
- [ ] Wrap only non-`Error` rejections for `onError`, preserving the original rejection at the caller boundary.
- [ ] Replace the measured-flaw line in `specs/hal-engine-config-hooks/spec.md` with the guarantee and add the consumer-facing change to `CHANGELOG.md`.

## Out of scope

- `beforeSession` escaping the `try` block.
- Usage accounting across tool rounds.
- Changing the value or shape re-thrown to callers.