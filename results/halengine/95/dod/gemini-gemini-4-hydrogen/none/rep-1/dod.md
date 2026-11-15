# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes `processMessage` and accepts `OrchestratorHooks.onError` and an `AIProvider`, so acceptance tests can inject a provider that rejects with a string, a plain object, or `undefined` and observe both the `onError` argument and the caller rejection directly today.

## Done when these pass

- [ ] **calls onError once with an Error wrapping a string rejection as cause and rethrows the string** — a provider rejecting with a string calls `onError` once with an `Error` whose `cause` is that string, while `processMessage` still rejects with the original string unchanged
  `src/orchestration/onErrorRejection.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping a plain object rejection as cause and rethrows the object** — a provider rejecting with a plain object calls `onError` once with an `Error` whose `cause` is that exact object reference, while `processMessage` still rejects with the original object unchanged
  `src/orchestration/onErrorRejection.acceptance.test.ts`
- [ ] **calls onError once with an Error wrapping an undefined rejection as cause and rethrows undefined** — a provider rejecting with `undefined` calls `onError` once with an `Error` carrying an own `cause` property equal to `undefined`, while `processMessage` still rejects with `undefined`
  `src/orchestration/onErrorRejection.acceptance.test.ts`

## Facets

- [ ] Update the `catch (error)` block in `src/orchestration/chatOrchestrator.ts` so `hooks.onError` is called for every rejection, passing `error` unchanged when `error instanceof Error` and `new Error(..., {cause: error})` otherwise, while `throw error` still rethrows the original value unchanged
- [ ] Add a unit test in `src/orchestration/chatOrchestrator.test.ts` (without editing existing tests) pinning that an `Error` instance reaches `onError` as the exact same instance rather than a wrapper
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining the behaviour change for consumers installing `onError`

## Out of scope

- `beforeSession` escaping the `try` block (handled separately)
- Usage accounting across tool rounds (HALEngine#93)
- Removing `.lore/dod.md` or modifying existing `onError` tests in `src/orchestration/chatOrchestrator.test.ts`