# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `hooks.onError` and accepts an `AIProvider` whose `sendMessage` can reject with arbitrary values, so the acceptance tests exercise the real orchestrator entry point directly.

## Done when these pass

- [ ] **calls onError with an Error wrapping a thrown string and rethrows the string** — `onError` runs once with an `Error` whose `cause` is the thrown string, while `processMessage` still rejects with the original string
  `src/orchestration/onErrorWrapping.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping a thrown object and rethrows the object** — `onError` runs once with an `Error` whose `cause` is the exact thrown plain object, while `processMessage` still rejects with that same object
  `src/orchestration/onErrorWrapping.acceptance.test.ts`

- [ ] **calls onError with an Error wrapping undefined and rethrows undefined** — `onError` runs once with an `Error` whose `cause` is `undefined`, while `processMessage` still rejects with `undefined`
  `src/orchestration/onErrorWrapping.acceptance.test.ts`

## Facets

- [ ] Wrap non-`Error` rejections in `new Error(..., {cause: error})` for `hooks.onError` in `src/orchestration/chatOrchestrator.ts` while leaving `Error` instances unwrapped and re-throwing the original `error` unchanged
- [ ] Add an entry to `CHANGELOG.md` under `## [Unreleased]` describing what changes for an existing consumer
- [ ] Keep existing `Error` pass-through tests in `src/orchestration/chatOrchestrator.test.ts` unedited and passing alongside the new acceptance tests, and verify `npm run verify` passes

## Out of scope

- `beforeSession` escaping the `try` (already addressed in its own issue)
- Usage accounting across tool rounds (`re-cinq/HALEngine#93`)