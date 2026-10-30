# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` already exposes the provider rejection, `onError`, and caller boundary in one real path. The acceptance test uses a rejecting provider and no doubles.

## Done when these pass

- [ ] **reports string, object, and undefined rejections to onError without changing the caller value or existing Errors** — every non-`Error` rejection invokes `onError` once with an `Error` whose cause is the original value, while the caller receives that original value and existing `Error` instances are not wrapped.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-`Error` rejections only for `onError`, preserving the raw rejected value when rethrowing.
- [ ] Replace the spec's recorded flaw with the new guarantee and add the consumer-facing CHANGELOG note.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds (HALEngine#93).