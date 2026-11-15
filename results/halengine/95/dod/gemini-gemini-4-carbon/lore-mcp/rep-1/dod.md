# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `hooks.onError` lifecycle seam and accepts an `AIProvider` whose `sendMessage` can reject with any value, so the acceptance test calls `orchestrator.processMessage(session)` directly today and fails on the skipped `onError` invocation.

## Done when these pass

- [ ] **wraps non-Error rejections with cause for onError and preserves caller rejection** — calls `onError` once for `string`, plain-object, and `undefined` rejections with an `Error` wrapper whose `cause` is the original value, passes `Error` rejections through unwrapped as the same instance, and re-throws every original rejection unchanged to the caller
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, remove the `error instanceof Error` gate on `hooks.onError`: pass `Error` instances through unchanged, wrap any non-`Error` rejection in an `Error` with `{cause: error}`, and still re-throw the original `error` unchanged
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` stating what changes for existing `onError` consumers

## Out of scope

- `beforeSession` escaping the `try` block (HALEngine#94)
- Usage accounting across tool rounds (HALEngine#93)
- Changing the rejection value propagated at the caller boundary