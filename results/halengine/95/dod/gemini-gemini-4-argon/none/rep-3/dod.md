# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks` directly; a test can drive `processMessage` with a provider that rejects with a string, a plain object, or `undefined` and observe that `onError` is bypassed today.

## Done when these pass

- [ ] **wraps a non-Error rejection in an Error with cause for onError while rethrowing the original value unchanged** — when a turn rejects with a string, a plain object, or `undefined`, `onError` is called once with an `Error` whose `cause` is that raw rejection, an `Error` rejection still reaches `onError` as the same instance, and the caller receives the original rejection unchanged.
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Wrap non-`Error` rejections in the `catch` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` with `error instanceof Error ? error : new Error(String(error), {cause: error})` so `hooks.onError` is called for every rejection with `cause` preserved, while still rethrowing the original `error` unchanged to the caller.
- [ ] Keep existing `Error` and `AIError` hook tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` to document the new guarantee for consumers.

## Out of scope

- `beforeSession` escaping the `try` block (HALEngine#94).
- Usage accounting across tool rounds (HALEngine#93).