# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam exists: `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks`, so a test can inject a provider that throws a non-Error value and an `onError` hook that records whether it was called. The failing guard is at `src/orchestration/chatOrchestrator.ts:150`.

## Done when these pass

- [ ] **calls onError with an Error whose cause is the string when the provider rejects with a string** — string rejection calls `onError` with a wrapping `Error` whose `cause` is the original string; caller gets the string
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is the object when the provider rejects with a plain object** — plain-object rejection calls `onError` with a wrapping `Error` whose `cause` is the original object; caller gets the object
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is undefined when the provider rejects with undefined** — `undefined` rejection calls `onError` with a wrapping `Error`; caller gets `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Change the `instanceof Error` guard in the `catch` at `src/orchestration/chatOrchestrator.ts:150` to call `onError` for every thrown value
- [ ] Wrap non-Error values: `new Error('Non-Error rejection', {cause: error})` before passing to `onError`; re-throw the original value unchanged
- [ ] Update `specs/hal-engine-config-hooks/spec.md` — replace the recorded-flaw bullet with the new guarantee statements (done by this DoD commit)
- [ ] Update `CHANGELOG.md` to describe what changes for an existing consumer

## Out of scope

- `beforeSession` escaping the `try` block (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Wrapping errors thrown by the hooks themselves (only provider/orchestration rejections are in scope)