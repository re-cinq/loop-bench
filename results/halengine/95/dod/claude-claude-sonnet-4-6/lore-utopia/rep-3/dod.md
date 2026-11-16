# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` accepts an `OrchestratorHooks.onError` callback, and the rejection path is reachable by supplying a provider whose `sendMessage` throws a non-Error value.

## Done when these pass

- [ ] **calls onError with an Error whose cause is the string when the provider rejects with a string, and rethrows unchanged** — `onError` is called once with an `Error` whose `cause` is the original string; the caller receives the string unchanged
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is the object when the provider rejects with a plain object, and rethrows unchanged** — same guarantee for a plain-object rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with an Error whose cause is undefined when the provider rejects with undefined, and rethrows unchanged** — same guarantee for `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove `instanceof Error` guard from the `catch` in `src/orchestration/chatOrchestrator.ts` (~line 150)
- [ ] Wrap the caught value: `const wrapped = error instanceof Error ? error : new Error('non-Error rejection', {cause: error}); await hooks.onError(session, wrapped);`
- [ ] Ensure `throw error` still rethrows the ORIGINAL value (not the wrapper)
- [ ] Update `specs/hal-engine-config-hooks/spec.md`: replace the "Measured semantics — out of scope" flaw line with the new guarantee
- [ ] Add a `### Changed` entry to `CHANGELOG.md` describing the new behaviour for existing consumers

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- A rejection that is already an `Error` reaching `onError` as the same instance — the existing tests in `chatOrchestrator.test.ts` already pin this behaviour and must stay green