# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts an `AIProvider` and `options.hooks.onError`, so calling `processMessage` with a rejecting provider exercises the `try`/`catch` entry point directly today and fails on the missing `onError` calls for non-`Error` rejections.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error with cause while keeping Error instances and caller rejections unchanged** — Rejecting a turn with a string, a plain object, or `undefined` calls `onError` once with the session and an `Error` whose `cause` is that thrown value, an `Error` rejection still reaches `onError` as the same instance rather than a wrapper, and the caller still receives the original rejection unchanged.
      `src/orchestration/onErrorRejection.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` so `hooks.onError` runs on every caught rejection, passing `error` directly when `error instanceof Error` and `new Error(String(error), {cause: error})` otherwise while still rethrowing the original `error` unchanged.
- [ ] Keep existing `Error` hook tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green, and add focused unit tests in a round-owned test file if needed.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing what changes for an existing `onError` consumer when a non-`Error` value is thrown.

## Out of scope

- `beforeSession` escaping the `try` block (tracked separately and already addressed in its own issue).
- Usage accounting across tool rounds in `afterModelResponse` (`HALEngine#93`).
- Changing the value rethrown at the `processMessage` / `processMessageStream` caller boundary.