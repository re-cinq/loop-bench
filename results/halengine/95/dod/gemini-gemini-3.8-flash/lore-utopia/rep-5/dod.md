# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The orchestrator lifecycle seam already exists at `createChatOrchestrator(...).processMessage(...)`. The acceptance test calls `processMessage` with a provider rejecting with non-Error values and asserts that `onError` is called with an `Error` wrapping the original rejection in `cause`, while the caller receives the original rejection unchanged.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — Calls onError once with an Error wrapping the rejection as cause when a provider rejects with a string, plain object, or undefined, while propagating the original rejection to the caller.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-Error rejections in the orchestrator catch in `new Error(..., {cause: error})` before invoking `hooks.onError`, while leaving Error instances untouched and keeping `throw error` re-throwing the original value.
- [ ] Keep existing tests in `src/orchestration/chatOrchestrator.test.ts` unedited and passing to verify that an Error instance reaches `onError` unchanged.
- [ ] Add an entry in `CHANGELOG.md` under [Unreleased] describing the migration note for `onError` firing for non-Error rejections.

## Out of scope

- `beforeSession` escaping the `try` (handled in re-cinq/HALEngine#94).
- Usage accounting across tool rounds (handled in re-cinq/HALEngine#93).