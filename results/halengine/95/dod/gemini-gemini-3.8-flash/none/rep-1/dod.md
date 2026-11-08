# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists. `createChatOrchestrator` accepts `OrchestratorHooks` and an `AIProvider`; an acceptance test can drive `processMessage` with a provider that rejects with a non-Error value and observe whether `onError` fires with a wrapped Error and what the caller receives.

## Done when these pass

- [ ] **wraps non-Error rejections in an Error preserving cause for onError and propagates unchanged** — a provider rejection that is not an `Error` (string, plain object, or `undefined`) calls `onError` once with an `Error` wrapping the original rejection as its `cause`, and the caller receives the original rejection unchanged. Fails today because `chatOrchestrator.ts` gates `onError` on `error instanceof Error`, skipping `onError` completely (`callCount` is 0).
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, wrap any caught rejection that is not already an `Error` in `new Error(String(error), {cause: error})` before passing it to `hooks.onError`, removing the `instanceof Error` gate that bypasses `onError`.
- [ ] Preserve the raw caught rejection on the re-throw at the caller boundary so the caller receives the original rejection unchanged.
- [ ] Confirm existing tests in `src/orchestration/chatOrchestrator.test.ts` stay green without modification, verifying an existing `Error` instance reaches `onError` unwrapped.
- [ ] Record the guarantee in `specs/hal-engine-config-hooks/spec.md` and add a CHANGELOG entry for existing consumers.

## Out of scope

- `beforeSession` escaping the `try` block (HALEngine#94).
- Usage accounting across tool rounds (HALEngine#93).