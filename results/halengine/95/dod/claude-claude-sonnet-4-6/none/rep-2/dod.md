# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The seam already exists: `createChatOrchestrator` accepts `hooks.onError`, and the `catch` block at `src/orchestration/chatOrchestrator.ts:150` is the exact site. The acceptance tests call `processMessage` with a provider that rejects with a string, plain object, and `undefined` respectively, then assert `onError` was called and received an `Error` whose `cause` is the original value.

## Done when these pass

- [ ] **calls onError with a wrapped Error when the provider rejects with a string, re-throwing the original string** — onError called once; error is an Error instance; error.cause is the original string; caller receives the original string
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error when the provider rejects with a plain object, re-throwing the original object** — same guarantee for a plain object rejection
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **calls onError with a wrapped Error when the provider rejects with undefined, re-throwing undefined** — same guarantee for undefined
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the `instanceof Error` guard from the `catch` in `chatOrchestrator.ts:150`; wrap non-Error values: `new Error('Non-Error rejection', {cause: error})`
- [ ] Re-throw the original value (not the wrapper), preserving the existing contract with the caller
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the recorded-flaw line under "Measured semantics" with the new guarantee (the new spec statement with test citation is already added in the "Error handling" section)
- [ ] Add CHANGELOG entry for the behaviour change
- [ ] Confirm existing `onError` tests for Error-instance rejections remain green (the wrapper must NOT apply when the thrown value is already an `Error`)

## Out of scope

- `beforeSession` escaping the outer `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)
- Any callers that currently depend on `onError` NOT firing for non-Error rejections (there are none in this repo)