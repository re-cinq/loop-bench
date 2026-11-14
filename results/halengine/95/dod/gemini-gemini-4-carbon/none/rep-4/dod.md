# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks`, and `processMessage` drives the real `processMessageStream` `try`/`catch` path where non-`Error` rejections currently bypass `onError`.

## Done when these pass

- [ ] **wraps a string rejection in an Error with cause for onError and rethrows the string unchanged** — calls `onError` once with an `Error` whose `cause` is the thrown string while rethrowing the original string to the caller; fails today because `onErrorCalls` is `0`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **wraps a plain-object rejection in an Error with cause for onError and rethrows the object unchanged** — calls `onError` once with an `Error` whose `cause` is the exact thrown object reference while rethrowing that object unchanged; fails today because `onErrorCalls` is `0`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **wraps an undefined rejection in an Error with cause for onError and rethrows undefined unchanged** — calls `onError` once with an `Error` carrying an own `cause` property set to `undefined` while rethrowing `undefined` unchanged; fails today because `onErrorCalls` is `0`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` so `hooks.onError` fires for every rejection, passing an `Error` instance unchanged and wrapping any non-`Error` value in `new Error(String(error), {cause: error})` while still rethrowing the original `error` unchanged to the caller.
- [ ] Leave `src/orchestration/chatOrchestrator.test.ts` unedited so existing `Error` tests continue to pin unwrapped `Error` delivery.
- [ ] Add a `CHANGELOG.md` entry under `[Unreleased]` (`### Fixed`) describing what changes for an existing consumer when a non-`Error` rejection reaches `onError`.

## Out of scope

- `beforeSession` escaping the `try` block (HALEngine#94).
- Usage accounting across tool rounds (HALEngine#93).
- Changing `OrchestratorHooks.onError`'s TypeScript signature or the value re-thrown at the caller boundary.