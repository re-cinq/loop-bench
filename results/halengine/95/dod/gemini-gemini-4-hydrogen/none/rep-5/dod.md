# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `hooks.onError` and catches provider rejections inside `processMessageStream`, so the acceptance tests can call `processMessage` directly and fail on the missing non-`Error` invocation.

## Done when these pass

- [ ] **calls onError once with an Error wrapping a string rejection in cause and rethrows the string unchanged** — a string rejection reaches `onError` wrapped in an `Error` with `cause` equal to the string, while the caller receives the original string unchanged
      `src/orchestration/onErrorRejection.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping a plain object or undefined rejection in cause and rethrows each unchanged** — a plain object or `undefined` rejection reaches `onError` wrapped in an `Error` with `cause` preserved (`'cause' in error`), while the caller receives each original rejection unchanged
      `src/orchestration/onErrorRejection.acceptance.test.ts`

## Facets

- [ ] Wrap any non-`Error` caught value in `new Error(..., {cause: error})` for `hooks.onError` in `src/orchestration/chatOrchestrator.ts` while passing `Error` instances straight through and re-throwing `error` unchanged
- [ ] Verify existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` remain unedited and passing (`Error` instances are not wrapped)
- [ ] Add a `### Fixed` / `### Changed` migration note in `CHANGELOG.md` explaining that `onError` now fires for non-`Error` rejections wrapped with `cause`

## Out of scope

- `beforeSession` escaping the `try` block (handled separately)
- Usage accounting across tool rounds (HALEngine#93)