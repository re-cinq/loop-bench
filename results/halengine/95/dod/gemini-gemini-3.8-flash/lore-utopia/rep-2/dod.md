# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists on `ChatOrchestrator`: `createChatOrchestrator` accepts `OrchestratorHooks` including `onError` and executes turn logic through `processMessage`. A test can configure a provider that rejects with a non-`Error` value, invoke `processMessage`, and observe whether `onError` fires and what rejection reaches the caller.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error whose cause is the original and still rejects the caller with the original** — a provider rejecting with a string, plain object, or undefined calls `onError` once with an `Error` whose `cause` is that rejected value, while the caller still receives the original rejection unchanged. Fails today because `chatOrchestrator.ts` gates `onError` on `error instanceof Error`, skipping `onError` entirely for all three non-Error rejection types (`onErrorCalls: 0`).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In the catch block of processMessageStream in `src/orchestration/chatOrchestrator.ts`, wrap any caught value that is not an `instanceof Error` in a new `Error` with `cause` set to the original value before invoking `hooks.onError`.
- [ ] Ensure `throw error` re-throws the original rejection unchanged to the caller.
- [ ] Confirm existing `Error` rejections reach `onError` as the same instance without wrapping, verified by existing unedited `onError` tests in `src/orchestration/chatOrchestrator.test.ts` staying green.
- [ ] Add a CHANGELOG.md entry under Changed documenting the behaviour change for consumers whose `onError` hooks will now receive wrapped non-Error rejections.

## Out of scope

- `beforeSession` escaping the `try` block (handled in issue #94).
- Usage accounting across tool rounds (handled in issue #93).
- Changes to the caller boundary rejection value or type.