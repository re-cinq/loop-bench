# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts `OrchestratorHooks.onError` directly and runs it from `processMessageStream`'s `catch` block, so an acceptance test can drive `processMessage` with a provider that rejects with non-`Error` values and observe `onError` and the caller's rejection today.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error with cause for onError and rethrows the original rejection unchanged** — a provider rejecting with a string, a plain object, or `undefined` calls `onError` once with an `Error` whose `cause` is the thrown value, while the caller still receives the original rejection unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, call `hooks.onError` for every caught rejection, passing `error` directly when `error instanceof Error` and wrapping any other value in `new Error(String(error), {cause: error})`, while still rethrowing the original `error` unchanged.
- [ ] Keep existing `Error`-rejection tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so an `Error` instance continues to reach `onError` unwrapped.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing what changes for an existing consumer of `onError`, and verify `specs/hal-engine-config-hooks/spec.md` anchors and status checks pass.

## Out of scope

- `beforeSession` escaping the `try` block (HALEngine#94, already shipped).
- Usage accounting across tool rounds in `afterModelResponse` (HALEngine#93, already shipped).