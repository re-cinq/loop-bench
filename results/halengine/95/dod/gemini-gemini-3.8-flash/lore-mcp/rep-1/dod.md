# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists. `createChatOrchestrator` returns an orchestrator whose `processMessage` is the real entry point, and a provider whose `sendMessage` rejects drives the `catch` at `src/orchestration/chatOrchestrator.ts:150`. A provider throwing a non-Error value calls the real entry point and fails on behaviour without needing a new module or boundary.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — a provider rejecting with a string, a plain object, and `undefined` each calls `onError` exactly once with an `Error` whose `cause` is the original value, while the caller still receives the original rejection unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: the new test asserts `onErrorCallCount: 1` / `isError` / `causeIsOriginal` for string, object, and undefined; today all three read `0` / `false` because `error instanceof Error` skips `onError`.
- [ ] Green: in `src/orchestration/chatOrchestrator.ts` catch block, when `hooks?.onError` is set, wrap a non-Error in `new Error(...)` with `{cause: error}` (leave an `Error` as-is) and call `onError`; keep `throw error` re-throwing the original value unchanged.
- [ ] Refactor: existing `onError` and lifecycle-order tests stay green unedited, pinning that an `Error` rejection reaches `onError` as the same instance.
- [ ] Doc (implementer): CHANGELOG `[Unreleased]` entry saying what changes for an existing consumer — a hook typed against `Error` now fires for rejections it previously never saw; the caller-boundary value is unchanged.

## Out of scope

- `beforeSession` escaping the `try` (its own issue, #94).
- Usage accounting across tool rounds (HALEngine#93).
- Modifying the re-thrown error value at the caller boundary — it stays exactly what it is today.