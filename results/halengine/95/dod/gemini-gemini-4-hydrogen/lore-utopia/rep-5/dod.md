# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a provider and `OrchestratorHooks` (`onError`) directly, so the acceptance test drives the real `processMessage` entry point and observes both `onError` calls and the caller rejection without mocks or stubs.

## Done when these pass

- [ ] **calls onError once with an Error wrapping the rejection as cause and rethrows the original value** — verifies that rejecting the provider with a string, a plain object, or `undefined` calls `onError` once with an `Error` whose `cause` is the original rejection by identity while rethrowing the original value unchanged to the caller
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Update the `catch (error)` block in `src/orchestration/chatOrchestrator.ts` to call `hooks.onError` for every rejection, wrapping non-`Error` values in `new Error(..., {cause: error})` while rethrowing the original `error` unchanged
- [ ] Keep existing `Error`-instance `onError` tests in `src/orchestration/chatOrchestrator.test.ts` unedited and green (confirming `Error` instances reach `onError` directly without wrapping)
- [ ] Add an `[Unreleased]` `### Changed` entry in `CHANGELOG.md` explaining that `onError` now fires for non-`Error` rejections (wrapped in `Error` with `cause`) while the caller-boundary rejection value is unchanged
- [ ] Confirm `npm run verify` (build, full test suite with coverage floors, typecheck, eslint `--max-warnings 0`, prettier, and spec gates) passes

## Out of scope

- `beforeSession` escaping the `try` block (separate issue)
- Usage accounting across tool rounds (HALEngine#93)