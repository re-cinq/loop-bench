# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(...).processMessage(session)` is the caller path a deployer uses and its rejection is observable today, so the acceptance test drives a real provider that rejects with each value and fails on the absent behaviour, not on a missing module. No doubles: the provider is a real `AIProvider` generator that throws, and the hook records what it was handed.

## Done when these pass

- [ ] **calls onError for every rejection, wrapping a non-Error as the cause, and still rejects the caller with the original value** — a provider rejecting with a string, a plain object, and `undefined` each reaches `onError` exactly once, as an `Error` whose `cause` is that original value, while a rejection that is already an `Error` (`AIError`) reaches `onError` and the caller as the same instance; the caller receives the original rejection unchanged in every row. Red today: the string/object/undefined rows report `onErrorCallCount: 0` with `callerGotTheOriginalRejection: true`, which is the claim verbatim.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Run only this file:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

## Facets

- [ ] `src/orchestration/chatOrchestrator.ts`: in the `catch` (line ~150), drop the `error instanceof Error` gate and call `onError` for every rejection, wrapping whatever is not already an `Error` in one that carries the original as `cause` (`new Error(..., {cause: error})`); `OrchestratorHooks.onError` keeps its `(session, error: Error)` signature, so hooks typed against `Error` keep compiling.
- [ ] The value re-thrown to the caller stays exactly what it is today — identity, not a wrapper (`callerGotTheOriginalRejection` pins this per row).
- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw bullet under "Measured semantics — out of scope" is replaced by the new guarantee under "Error reporting to hooks", citing the acceptance test (done in this commit — the red bar is the test, the statement is in place).
- [ ] `CHANGELOG.md`, under `[Unreleased]` `### Fixed`: an entry saying what changes for an existing consumer — `onError` now fires where it silently did not, and the `Error` it receives for a non-`Error` rejection is a wrapper whose `cause` carries the original.
- [ ] The existing `src/orchestration/chatOrchestrator.test.ts` stays unedited and green — its `onError` cases pin the already-an-`Error` path the fix must not disturb.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).