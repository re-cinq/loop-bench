# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `processMessage` and accepts `OrchestratorHooks.onError` plus an `AIProvider`, so an acceptance test can drive turns whose provider rejects with non-`Error` values today and observe both `onError` and the caller-visible rejection directly.

## Done when these pass

- [ ] **wraps string, plain-object, and undefined rejections for onError and rethrows each unchanged** — drives `processMessage` against providers that reject with a string, a plain object, and `undefined`; asserts `onError` fires once per turn with the session and an `Error` whose `cause` is the exact rejected value, while the caller still receives the original rejection unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` so every rejection calls `onError` once, passing `error` directly when it is already an `Error` and wrapping any other value in `new Error(..., {cause: error})` while still re-throwing the original `error` unchanged.
- [ ] Keep existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so an `Error` rejection still reaches `onError` as the same instance rather than a wrapper.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining that `onError` now fires for non-`Error` rejections wrapped in an `Error` with `cause` set to the rejected value while callers still receive the original rejection unchanged.

## Out of scope

- Changing the `OrchestratorHooks.onError` TypeScript signature away from `(session: ChatSession, error: Error) => Promise<void>` or changing the value re-thrown to callers of `processMessage` / `processMessageStream`.
- `beforeSession` escaping the `try` block (HALEngine#94) and usage accounting across tool rounds (HALEngine#93).