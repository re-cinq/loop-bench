# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts `options.hooks` (`OrchestratorHooks`) and a pluggable `AIProvider`, so the acceptance test can drive `processMessage` directly through the real orchestrator seam and observe the missing `onError` and `afterSession` invocations today.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — `beforeSession` throwing an `Error` still rejects the caller with that same `Error`, fires `onError(session, error)` then `afterSession(session)`, and runs no later turn hook or provider call
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `if (hooks?.beforeSession) await hooks.beforeSession(session);` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`), `finally` (`afterSession`), and still re-throws to the caller
- [ ] Keep all existing non-throwing `beforeSession` and lifecycle-order tests unedited and passing (`src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts`)
- [ ] Decide and record explicitly in `specs/hal-engine-config-hooks/spec.md` what an `afterSession` cleanup hook can assume about how much of the turn happened when `beforeSession` fails (never started vs allocated and finished)
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining the behaviour change for consumers whose `beforeSession` throws

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (separate issue)
- Usage accounting across tool rounds in `afterModelResponse` (`re-cinq/HALEngine#93`)