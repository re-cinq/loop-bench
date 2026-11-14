# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the real `AIProvider` and `OrchestratorHooks.onError` seams (`HalEngineConfig.provider` accepts only `ProviderConfig`, so provider-driven hook tests exercise `createChatOrchestrator` directly). One acceptance test drives string, plain-object, and `undefined` rejections through `processMessage` and fails today because `onError` is skipped for all three.

## Done when these pass

- [ ] **ChatOrchestrator onError non-Error rejections wraps non-Error rejections with cause and rethrows the original value** — calls `onError` once with the session and an `Error` whose `cause` is the original thrown value for string, plain-object, and `undefined` rejections, while re-throwing the original value unchanged to the caller
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, invoke `hooks.onError` on every caught rejection, passing `error` unchanged when `error instanceof Error` and wrapping any other thrown value in `new Error(String(error), {cause: error})`, while still re-throwing the original `error` unchanged.
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so `Error` rejections continue reaching `onError` unwrapped.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` (`### Changed`) explaining that `onError` now fires for non-`Error` rejections wrapped in an `Error` with `cause` set to the original value while the caller-boundary rejection value stays unchanged.

## Out of scope

- `beforeSession` escaping the `try` block (handled in its own issue).
- Usage accounting across tool rounds (`re-cinq/HALEngine#93`).