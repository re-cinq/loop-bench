# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` returns an orchestrator whose `processMessage` calls the installed `OrchestratorHooks.onError` in its `catch` block. An acceptance test can install an `onError` hook, configure a provider that throws non-Error rejections (string, plain object, undefined), and observe that `onError` is skipped today while the caller still receives the rejection.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — a provider rejecting with a value that is not an Error (string, plain object, undefined) calls `onError` once with an Error wrapping the original in `cause`, while the caller still receives the original rejection unchanged. Fails today because `onError` is gated on `error instanceof Error`, skipping the hook entirely (call count 0).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, update the `catch (error)` block to call `onError` for non-Error rejections by wrapping them in `new Error(String(error), {cause: error})`, while passing existing `Error` instances through unchanged.
- [ ] Confirm existing Error rejection behavior is unchanged — existing tests in `src/orchestration/chatOrchestrator.test.ts` stay green without edits.
- [ ] Add a CHANGELOG entry under `[Unreleased]` describing the behavior change for `onError` with non-Error rejections and the migration note.

## Out of scope

- `beforeSession` escaping the `try` (handled in #94).
- Usage accounting across tool rounds (handled in #93).