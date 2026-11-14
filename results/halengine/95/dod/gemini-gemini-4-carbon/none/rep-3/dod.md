# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts an `AIProvider` and `OrchestratorHooks.onError`, and `processMessage` drives the `try`/`catch` in `processMessageStream` directly, so acceptance tests can reject with non-`Error` values today and observe both `onError` and the caller's rejection without a new seam.

## Done when these pass

- [ ] **wraps a string rejection in an Error with cause for onError and rethrows the string** — a provider rejecting with a string calls `onError` once with an `Error` whose `cause` is that string, and still rejects `processMessage` with the original string unchanged; fails today because `seen` is `[]`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **wraps object and undefined rejections with cause for onError and rethrows each as-is** — a provider rejecting with a plain object or with `undefined` calls `onError` once with an `Error` whose `cause` is `Object.is`-identical to the thrown value, and still rejects `processMessage` with that exact value unchanged; fails today because `seen` is `[]` in both turns.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Red: both acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts` fail because `chatOrchestrator.ts` gates `hooks.onError` on `error instanceof Error`.
- [ ] Green: in `src/orchestration/chatOrchestrator.ts`, call `hooks.onError` for every caught value, passing an `Error` as-is and wrapping any non-`Error` value (including `undefined`) in `new Error(String(error), {cause: error})`, while still `throw`ing the original `error` unchanged to the caller.
- [ ] Preserve: existing `Error` rejection tests in `src/orchestration/chatOrchestrator.test.ts` (`called with session and error when stream fails`, `error still propagates after onError hook`, `error path calls onError then afterSession`, `runs onError then afterSession when it throws, and still rejects to the caller`) remain unedited and green, pinning that an `Error` instance reaches `onError` unwrapped.
- [ ] Docs: add an entry in `CHANGELOG.md` stating what changes for an existing consumer (`specs/hal-engine-config-hooks/spec.md` already replaces its recorded-flaw line with the new guarantee cited to the acceptance tests).

## Out of scope

- Changing the value re-thrown at the caller boundary (`processMessage` and `processMessageStream` continue to re-throw the original rejection unchanged).
- Changing the `OrchestratorHooks.onError` signature (`(session: ChatSession, error: Error) => Promise<void>` remains typed against `Error`).
- Adding a new test for rejections that are already `instanceof Error` (already green today and explicitly pinned by the existing tests in `src/orchestration/chatOrchestrator.test.ts` remaining unedited).
- `beforeSession` escaping `try` (its own issue) and usage accounting across tool rounds (HALEngine#93).