# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts `options.hooks.onError` and a custom `AIProvider` directly, so the acceptance test calls `processMessage` with a provider that throws non-`Error` values and observes `onError` and the caller's rejection at the real entry point.

## Done when these pass

- [ ] **ChatOrchestrator onError for non-Error rejections wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — calls `onError` once with an `Error` wrapping the thrown string, plain object, or `undefined` as `cause` while re-throwing the original rejection unchanged to the caller
  `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, call `hooks.onError` for every rejection in the `catch` block, passing an `Error` as-is and wrapping any non-`Error` rejection in `new Error(..., {cause: error})` while keeping `throw error` so the original rejection still reaches the caller unchanged
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so `Error` instances continue to reach `onError` unwrapped
- [ ] Update `specs/hal-engine-config-hooks/spec.md` and add a `CHANGELOG.md` entry under `## [Unreleased]` describing what changes for an existing consumer

## Out of scope

- `beforeSession` escaping the `try` (tracked in its own issue)
- Usage accounting across tool rounds (HALEngine#93)