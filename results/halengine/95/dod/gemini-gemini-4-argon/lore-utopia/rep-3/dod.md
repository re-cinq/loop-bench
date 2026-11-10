# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks`, so the acceptance test can throw non-`Error` values from `provider.sendMessage`, observe `hooks.onError`, and inspect the rejection returned by `processMessage` directly.

## Done when these pass

- [ ] **ChatOrchestrator onError non-Error rejections wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — verifies that rejecting with a string, a plain object, or `undefined` each calls `onError` once with an `Error` whose `cause` is that original value while still rejecting the caller with the original value unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, remove the `error instanceof Error` gate in the `catch` block of `processMessageStream`, pass `error instanceof Error ? error : new Error(String(error), {cause: error})` to `hooks.onError`, and re-throw the original `error` unchanged while keeping existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` green and unedited.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing what changes for an existing consumer whose `onError` hook now fires for non-`Error` rejections wrapped with `cause`.

## Out of scope

- `beforeSession` escaping the `try` block (covered by its own issue)
- Usage accounting across tool rounds (HALEngine#93)