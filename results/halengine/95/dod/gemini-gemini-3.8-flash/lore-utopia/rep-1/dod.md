# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists on `createChatOrchestrator` and `processMessage`; a provider whose `sendMessage` rejects with a non-Error value drives the catch block in `src/orchestration/chatOrchestrator.ts`.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — a provider rejecting with a string, a plain object, and `undefined` each calls `onError` once with an `Error` whose `cause` is that original value, and the caller still receives the original rejection unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: the acceptance test fails because `error instanceof Error` skips `onError` when the rejection is a string, object, or `undefined`.
- [ ] Green: wrap any non-`Error` rejection in `new Error(...)` with `{cause: error}` before calling `hooks.onError`, while leaving an `Error` as-is, and re-throw the original `error` unchanged.
- [ ] Refactor: existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts` continue to pass unedited, proving an `Error` instance reaches `onError` unwrapped.
- [ ] Doc: CHANGELOG `[Unreleased]` entry explains that `onError` now fires for non-`Error` rejections with the original wrapped in `cause`, with caller-boundary rejections unchanged.

## Out of scope

- `beforeSession` escaping the `try` block (handled by issue #94).
- Usage accounting across tool rounds (handled by issue #93).
- Modifying the rejection value returned to the caller at the caller boundary.