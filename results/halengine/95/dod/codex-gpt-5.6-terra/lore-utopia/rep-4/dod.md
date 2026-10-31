# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real entry point and accepts a provider whose stream can reject with each reported value. The acceptance test reaches the existing `catch` without a new seam or replacement module.

## Done when these pass

- [ ] **calls onError once with an Error caused by each rejection while the caller receives the original value** — string, plain-object, and `undefined` provider rejections each call `onError` once with an `Error` whose `cause` is the raw rejection, while the caller receives that same raw value.
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Make the `catch` call `onError` for every rejection, wrapping only non-`Error` values with their original value as `cause` and rethrowing the original value unchanged.
- [ ] Leave the existing tests that pin an already-`Error` rejection as the same instance unedited.
- [ ] Add the promised `[Unreleased]` changelog migration note for existing `onError` consumers.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).