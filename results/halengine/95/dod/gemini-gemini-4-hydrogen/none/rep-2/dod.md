# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a pluggable `AIProvider` and `OrchestratorHooks.onError`, so the acceptance tests call `processMessage` directly with a rejecting provider and observe both `onError` and the re-thrown rejection.

## Done when these pass

- [ ] **calls onError once with an Error wrapping a string rejection as cause while rethrowing the original string** — a string rejection reaches `onError` as an `Error` with `cause` equal to that string, and the caller still receives the original string unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError once with an Error wrapping a plain object rejection as cause while rethrowing the original object** — a plain object rejection reaches `onError` as an `Error` with `cause` referencing that object, and the caller still receives the same object reference unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError once with an Error wrapping an undefined rejection as cause while rethrowing undefined** — an `undefined` rejection reaches `onError` as an `Error` with `cause: undefined`, and the caller still receives `undefined` unchanged
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize caught non-`Error` values in `src/orchestration/chatOrchestrator.ts` before invoking `hooks.onError` by wrapping them in `new Error(..., {cause: error})`, while passing existing `Error` instances through as the exact same instance and re-throwing the original `error` unchanged
- [ ] Verify existing `Error`-rejection tests in `src/orchestration/chatOrchestrator.test.ts` remain unedited and passing, and confirm an `Error` rejection reaches `onError` as the same instance
- [ ] Add a consumer-facing entry in `CHANGELOG.md` under `## [Unreleased]` describing the new `onError` behaviour for non-`Error` rejections

## Out of scope

- `beforeSession` escaping the `try` block (tracked in its own issue)
- Usage accounting across tool rounds (HALEngine#93)