# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — `createChatOrchestrator` already accepts an `AIProvider` and `OrchestratorHooks.onError` directly, so the acceptance tests invoke `processMessage` with providers that reject with non-`Error` values and observe both the hook invocation and the caller rejection.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the thrown string and preserves the string rejection** — rejecting with a string calls `onError` once with an `Error` whose `cause` is that string, and re-throws the original string to the caller
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is the thrown plain object and preserves the object rejection** — rejecting with a plain object calls `onError` once with an `Error` whose `cause` is that exact object, and re-throws the original object to the caller
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`
- [ ] **calls onError once with an Error whose cause is undefined and preserves the undefined rejection** — rejecting with `undefined` calls `onError` once with an `Error` carrying `cause: undefined`, and re-throws `undefined` to the caller
      `src/orchestration/onErrorNonErrorRejection.acceptance.test.ts`

## Facets

- [ ] Remove the `error instanceof Error` gate in `src/orchestration/chatOrchestrator.ts` and wrap any non-`Error` rejection in `new Error(String(error), {cause: error})` when invoking `hooks.onError`, while keeping `Error` instances unwrapped and re-throwing the original `error` unchanged
- [ ] Verify existing `Error`-instance tests in `src/orchestration/chatOrchestrator.test.ts` remain unedited and add/keep coverage confirming an `Error` reaches `onError` as the same instance
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining what changes for an existing consumer
- [ ] Run `npm run verify` (`typecheck`, `eslint`, `prettier:check`, `test:coverage`, `build`, and doc/spec checks)

## Out of scope

- `beforeSession` escaping the `try` block (tracked in HALEngine#94)
- Usage accounting across tool rounds (tracked in HALEngine#93)