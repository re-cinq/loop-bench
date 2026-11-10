# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` and `options.hooks.onError` directly, so the acceptance test can exercise `processMessage` with a provider that throws non-`Error` values (`string`, plain object, `undefined`) and fail today because `onError` is skipped.

## Done when these pass

- [ ] **ChatOrchestrator onError non-Error rejections wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — calls `onError` once for a string, plain object, and `undefined` rejection, wrapping the thrown value in an `Error` whose `cause` is that original value while still rejecting the caller with the original value unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, remove the `error instanceof Error` gate in the `catch` block: pass an `Error` instance to `hooks.onError` as-is, wrap any non-`Error` value in `new Error(String(error), {cause: error})`, and still `throw error` so the caller boundary receives the original rejection unchanged
- [ ] Keep the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` green and unedited so `Error` instances continue to reach `onError` unwrapped
- [ ] Add a `### Changed` entry under `## [Unreleased]` in `CHANGELOG.md` explaining that `onError` now fires for non-`Error` rejections wrapped in an `Error` with `cause` set to the original value while the caller-boundary rejection remains unchanged

## Out of scope

- `beforeSession` escaping the `try` (already covered separately)
- Usage accounting across tool rounds (HALEngine#93)