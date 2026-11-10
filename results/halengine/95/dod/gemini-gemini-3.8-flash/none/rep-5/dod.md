# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The lifecycle seam already exists in `createChatOrchestrator` via `OrchestratorHooks.onError`. A test can configure an `onError` hook, invoke `processMessage` with a provider that rejects with a non-Error value, and observe whether `onError` is called with an `Error` wrapping that value as `cause` while preserving the caller's rejection.

## Done when these pass

- [ ] **wraps non-Error rejections in an Error with cause and still rejects original to caller** — a provider rejecting with a string, a plain object, or `undefined` calls `onError` once with an `Error` whose `cause` is that rejection value, while the caller still receives the original rejection unchanged. Fails today because the `catch` gates `onError` on `error instanceof Error`, so `onError` is bypassed (`onErrorCalls` is 0, `isErrorInstance` is false).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, remove the `error instanceof Error` gate so `onError` is called for every rejection, wrapping non-`Error` rejections in `new Error(String(error), {cause: error})`.
- [ ] Ensure the re-thrown value at the caller boundary remains the original rejection value unchanged.
- [ ] Verify that existing tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`) remain green, confirming that `Error` instances reach `onError` unwrapped.
- [ ] Add a CHANGELOG.md entry describing what changes for existing consumers whose hooks now receive previously-bypassed non-`Error` rejections wrapped in `Error`.

## Out of scope

- `beforeSession` escaping the `try` block (resolved in HALEngine#94).
- Usage accounting across tool rounds (resolved in HALEngine#93).
- Altering the re-thrown error value received by the caller at the `processMessage` boundary.