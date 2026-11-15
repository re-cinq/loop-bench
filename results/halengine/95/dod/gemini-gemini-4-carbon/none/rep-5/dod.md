# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `options.hooks.onError` and an `AIProvider` whose `sendMessage` stream can reject with any value. Driving `processMessage` with non-`Error` rejections hits the `catch` block in `src/orchestration/chatOrchestrator.ts` directly and fails today because `onError` is gated on `error instanceof Error`.

## Done when these pass

- [ ] **wraps non-Error rejections in an Error with cause for onError and rethrows each unchanged** — rejects from the provider with a string, a plain object, and `undefined`, asserting for each that `onError` is called once with the session and an `Error` whose own `cause` property is `Object.is`-identical to the rejected value while `processMessage` still rejects with the original value unchanged (`onErrorCalls` is `0` today for all three).
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` so `hooks.onError` runs for every caught rejection, passing `error` unchanged when `error instanceof Error` and wrapping any non-`Error` value in `new Error(String(error), {cause: error})`.
- [ ] Keep re-throwing the original caught value (`throw error`) rather than the wrapper so callers observe no change in rejection shape.
- [ ] Leave existing `Error`-rejection tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green so `Error` instances continue to reach `onError` as the same instance rather than a wrapper.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining what changes for an existing consumer (`specs/hal-engine-config-hooks/spec.md` already replaces the recorded-flaw line with the new guarantee and links the acceptance test).

## Out of scope

- `beforeSession` escaping the `try` block (resolved separately in HALEngine#94).
- Usage accounting across tool rounds (resolved separately in HALEngine#93).
- Changing the `OrchestratorHooks.onError` signature (`error: Error` stays unchanged).