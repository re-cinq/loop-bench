# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `processMessage`, and a provider rejection reaches its error hook through that entry point. One acceptance test covers the reported non-`Error` values, the existing `Error` case, and the unchanged caller rejection.

## Done when these pass

- [ ] **reports every provider rejection to onError without changing the caller rejection** — `onError` receives one `Error` with the original value as `cause` for string, plain-object, and `undefined` rejections; an existing `Error` is passed through unchanged, and callers receive every original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Wrap non-`Error` rejections for `onError`, preserving the original value as `cause`.
- [ ] Pass existing `Error` instances to `onError` unchanged and rethrow the original rejection to callers.
- [ ] Keep the existing orchestrator tests unedited and green.
- [ ] Document the new guarantee in the spec and describe the consumer-visible change in `CHANGELOG.md`.
- [ ] Pass CI build, test, typecheck, eslint, and prettier checks.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.