# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts an `AIProvider` and `OrchestratorHooks.onError`, so the acceptance test calls `processMessage` directly with providers that reject with a string, a plain object, and `undefined` and fails because `onError` receives zero calls.

## Done when these pass

- [ ] **calls onError once with an Error cause for string, object, and undefined rejections** — verifies `onError` fires once with an `Error` whose `cause` is the thrown string, plain object, or `undefined`, while the caller still receives the original rejection unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts` (`processMessageStream` `catch` block), call `hooks.onError(session, ...)` for any rejection, passing `error` directly when `error instanceof Error` and wrapping non-`Error` values in an `Error` with `{cause: error}`, while still re-throwing the original `error` unchanged
- [ ] Keep the existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green (confirming `Error` instances still reach `onError` unwrapped)
- [ ] Update `CHANGELOG.md` under `## [Unreleased]` describing what changes for an existing consumer (`onError` now fires for rejections that are not `Error` instances, wrapped in `Error` with `cause` set to the original value; caller rejections remain unchanged)

## Out of scope

- `beforeSession` escaping `try` (handled in its own issue) and usage accounting across tool rounds (`HALEngine#93`)
- Changing the shape of the re-thrown rejection at the caller boundary