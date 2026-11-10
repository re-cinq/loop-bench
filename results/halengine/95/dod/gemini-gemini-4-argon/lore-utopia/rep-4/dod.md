# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `options.hooks.onError` and `processMessage(session)`, so the acceptance test drives the real orchestrator with a provider that rejects with non-`Error` values (`string`, plain object, `undefined`) and fails directly on `onError` not being called.

## Done when these pass

- [ ] **ChatOrchestrator onError for non-Error rejections wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — verifies that rejecting with a string, a plain object, or `undefined` invokes `onError` once with an `Error` instance whose `cause` is the original thrown value, while `processMessage` still rejects with the original value unchanged
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, remove the `error instanceof Error` gate in the `catch` block and pass `error instanceof Error ? error : new Error(String(error), {cause: error})` to `hooks.onError`, while keeping `throw error` so the original rejection still propagates unchanged to the caller
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so an `Error` rejection is proven to reach `onError` as the same instance
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining what changes for an existing `onError` consumer when non-`Error` rejections are wrapped with `cause`

## Out of scope

- `beforeSession` escaping the `try` (tracked and resolved separately in HALEngine#94)
- Usage accounting across tool rounds (tracked and resolved separately in HALEngine#93)