# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `AIProvider` and `options.hooks.onError` seam directly, so the acceptance test drives `processMessage` with non-`Error` rejections today and fails because `onError` is skipped.

## Done when these pass

- [ ] **chatOrchestrator non-Error rejections > wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — calls `onError` once for a rejected string, plain object, and `undefined`, passing the session and an `Error` whose `cause` is the original value while still rejecting the caller with the original value unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, call `hooks.onError` for every caught rejection, passing `error` directly when `error instanceof Error` and wrapping any non-`Error` value in `new Error(String(error), {cause: error})` while still rethrowing the original `error` unchanged
- [ ] Keep `src/orchestration/chatOrchestrator.test.ts` unedited and green so `Error` rejections remain proven unwrapped at the hook boundary
- [ ] Document under `CHANGELOG.md` `[Unreleased]` what changes for an existing `onError` consumer when a turn rejects with a non-`Error` value

## Out of scope

- `beforeSession` escaping the `try` block (tracked separately and already shipped)
- Usage accounting across tool rounds (`HALEngine#93`)
- Changing the re-thrown rejection shape observed by callers of `processMessage` or `processMessageStream`