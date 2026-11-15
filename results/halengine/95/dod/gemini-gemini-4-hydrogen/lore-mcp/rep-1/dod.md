# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks.onError` already expose the entry point and hook seam, so the acceptance test calls `processMessage` directly with a rejecting provider and fails on the `instanceof Error` gate in `src/orchestration/chatOrchestrator.ts`.

## Done when these pass

- [ ] **calls onError once with an Error wrapping non-Error rejections as cause and rethrows original** — verifies that rejecting with a string, a plain object, or `undefined` calls `onError` once with an `Error` instance whose `cause` is the original rejection by identity while re-throwing the original rejection unchanged to the caller
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts` (`catch` at L149-153), when `hooks?.onError` is present, pass `error instanceof Error ? error : new Error(..., {cause: error})` to `hooks.onError` and keep `throw error` unchanged
- [ ] Keep all existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green (pinning that an `Error` rejection reaches `onError` as the same instance)
- [ ] Remove the `Measured semantics — out of scope` section from `specs/hal-engine-config-hooks/spec.md` (the `instanceof Error` flaw is the last item there) and keep `Status` at `Shipped`
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining that `onError` now fires for non-`Error` rejections wrapped in an `Error` with `cause`, while callers still receive the original rejection unchanged

## Out of scope

- `beforeSession` escaping the `try` block (separate issue)
- Usage accounting across tool rounds (`HALEngine#93`)