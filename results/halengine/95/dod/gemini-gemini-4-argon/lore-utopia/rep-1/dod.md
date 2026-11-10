# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks` directly; an acceptance test can drive `processMessage` with a provider that rejects with non-`Error` values (`string`, plain `object`, `undefined`) and observe that `onError` is bypassed today.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — exercises `processMessage` when the provider rejects with a string, a plain object, and `undefined`, asserting that `onError` fires once per rejection with an `Error` instance whose `cause` property holds the original value and that the caller still receives the raw rejection unchanged.
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, update the `catch` block in `processMessageStream` so `hooks.onError` is called for every rejection: pass an existing `Error` instance directly, and wrap any non-`Error` value in `new Error(String(error), {cause: error})` before passing it to `hooks.onError`, while still re-throwing the original `error` unchanged.
- [ ] Keep existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` passing unedited so a rejection that is already an `Error` reaches `onError` as the same instance rather than a wrapper.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining that `onError` now fires for non-`Error` rejections wrapped in an `Error` with `cause` set to the original value while the caller-boundary rejection value remains unchanged.

## Out of scope

- `beforeSession` escaping the `try` (HALEngine#94).
- Usage accounting across tool rounds (HALEngine#93).