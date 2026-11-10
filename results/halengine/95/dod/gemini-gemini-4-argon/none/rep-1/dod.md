# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists. `createChatOrchestrator` accepts an `AIProvider` and `OrchestratorHooks`, so an acceptance test can drive `processMessage` with a provider that rejects with a string, a plain object, or `undefined` and observe both the `Error` (with `cause`) passed to `onError` and the unchanged rejection propagated to the caller.

## Done when these pass

- [ ] **calls onError with an Error preserving cause and propagates the original rejection for a string, plain object, or undefined** — `onError` fires once per rejection with an `Error` instance whose `cause` is the thrown string, plain object, or `undefined`, while `processMessage` rejects with the original value unchanged.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, invoke `hooks.onError` for every caught rejection, wrapping any value that is not already an `Error` in an `Error` with `{cause: error}` while passing existing `Error` instances through unchanged and re-throwing the original `error` value to the caller.
- [ ] Confirm existing `Error` and `AIError` tests in `src/orchestration/chatOrchestrator.test.ts` remain unedited and green.
- [ ] Ensure `specs/hal-engine-config-hooks/spec.md` replaces the recorded-flaw section with the new guarantee and add a `CHANGELOG.md` entry under `## [Unreleased]` describing what changes for an existing consumer.

## Out of scope

- `beforeSession` escaping the `try` (its own issue)
- Usage accounting across tool rounds (HALEngine#93)