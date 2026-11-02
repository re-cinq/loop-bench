# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam exists: `createChatOrchestrator` takes `hooks.onError`, and a provider can reject with any value through `sendMessage`. The test calls `processMessage` and fails today because the `catch` gates `onError` on `error instanceof Error`.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is each non-Error rejection, and still rejects the caller with the original value** — covers a string, a plain object and `undefined`; the session passed to `onError` is the caller's session
      `src/orchestration/chatOrchestratorOnError.acceptance.test.ts`

## Facets

- [ ] Wrap a non-`Error` rejection in an `Error` whose `cause` is the original value, and call `onError` with it, in the `catch` of `src/orchestration/chatOrchestrator.ts`
- [ ] Re-throw the original value unchanged at the caller boundary
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, and add the CHANGELOG entry for existing consumers

## Out of scope

- A rejection that is already an `Error` reaching `onError` as the same instance: already true, and pinned by the existing unedited tests in `src/orchestration/chatOrchestrator.test.ts`, so it owes no new acceptance test
- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)