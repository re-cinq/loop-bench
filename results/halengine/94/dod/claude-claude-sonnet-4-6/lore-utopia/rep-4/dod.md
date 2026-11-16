# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `OrchestratorHooks` argument today; the acceptance tests call it with a `beforeSession` that throws and assert that `onError` and `afterSession` fire, which they currently do not.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — `onError` receives the thrown error when `beforeSession` rejects, same argument shape as any other orchestrator failure
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` fires even when `beforeSession` throws, so a cleanup hook can release anything allocated in `beforeSession`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `hooks?.beforeSession` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` (currently line 91, before the `try` at line 93)
- [ ] Verify `onError` fires for the `beforeSession` throw (same `catch` branch as other failures)
- [ ] Verify `afterSession` fires via `finally` after a `beforeSession` throw
- [ ] Confirm the rejection still propagates to the caller (unchanged behaviour)
- [ ] Remove the first bullet in `specs/hal-engine-config-hooks/spec.md § Measured semantics — out of scope` (the recorded-flaw line about `beforeSession`) and replace it with a note that this was fixed by HALEngine#94
- [ ] Add a `### Fixed` entry to `CHANGELOG.md` describing what changes for a consumer

## Out of scope

- The `instanceof Error` gate on `onError` (HALEngine#95 or similar separate issue)
- Usage accounting across tool rounds (HALEngine#93)
- The `afterModelResponse` under-counting flaw (third bullet in Measured semantics)