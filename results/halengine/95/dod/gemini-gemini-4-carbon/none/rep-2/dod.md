# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `options.hooks.onError` as the lifecycle seam and accepts any `AIProvider`, so the acceptance tests drive `processMessage` directly with a rejecting provider and fail on the missing `onError` invocation.

## Done when these pass

- [ ] **wraps a rejected string in an Error with cause for onError while rethrowing the string unchanged** — A provider rejecting with a string calls `onError` once with an `Error` whose `cause` is that string, and the caller still receives the original string rejection unchanged
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **wraps a rejected plain object in an Error with cause for onError while rethrowing the object unchanged** — A provider rejecting with a plain object calls `onError` once with an `Error` whose `cause` is that exact object instance, and the caller still receives the original object reference unchanged
      `src/orchestration/onErrorNonError.acceptance.test.ts`
- [ ] **wraps a rejected undefined in an Error with cause for onError while rethrowing undefined unchanged** — A provider rejecting with `undefined` calls `onError` once with an `Error` that carries own `cause` set to `undefined`, and the caller still receives the original `undefined` rejection unchanged
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Normalize non-`Error` rejections inside the `catch` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` by wrapping them in an `Error` with `{cause: error}` for `hooks.onError`, leaving `Error` instances unwrapped and keeping `src/orchestration/chatOrchestrator.test.ts` unedited
- [ ] Preserve the re-thrown value at the caller boundary (`throw error`) so callers continue to receive the original rejection unchanged
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing what changes for an existing consumer

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (`re-cinq/HALEngine#93`)