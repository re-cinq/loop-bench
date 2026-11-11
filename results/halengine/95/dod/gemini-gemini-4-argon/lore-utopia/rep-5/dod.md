# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks`, so an acceptance test can call `processMessage` with a provider that rejects with a string, a plain object, and `undefined`, and observe directly that `onError` is bypassed today.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — when a provider rejects with a string, a plain object, or `undefined`, `onError` fires once with an `Error` instance whose `cause` is that original value, and the caller still receives the original rejection value unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, remove the `error instanceof Error` gate in the `catch` block of `processMessageStream`, passing an `Error` as-is to `hooks.onError` and wrapping any non-`Error` value in a `new Error(String(error), {cause: error})` while still re-throwing the original `error` unchanged to the caller.
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so a rejection that is already an `Error` reaches `onError` as the same instance rather than a wrapper.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining what changes for an existing consumer (`onError` now fires for non-`Error` rejections wrapped in an `Error` with `cause`, while the caller-boundary rejection value remains unchanged).

## Out of scope

- `beforeSession` escaping the `try` block (HALEngine#94).
- Usage accounting across tool rounds (HALEngine#93).