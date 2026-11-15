# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`) and drives the turn through `processMessage`/`processMessageStream`. Moving `hooks.beforeSession` inside the existing `try` block makes `onError` and `afterSession` observe a `beforeSession` throw through the real public entry point.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — verifies that a throwing `beforeSession` still rejects to the caller with the same error, fires `onError(session, error)` and then `afterSession(session)`, and runs no user-input or model-response hooks
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts`
- [ ] Verify existing `beforeSession`, `afterSession`, `onError`, and lifecycle-order tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` remain green unedited
- [ ] Confirm the updated guarantee and cleanup assumption in `specs/hal-engine-config-hooks/spec.md` and add a `CHANGELOG.md` entry under `## [Unreleased]` describing what changes for an existing consumer
- [ ] Run `npm run verify` (typecheck, eslint, prettier, coverage, build, spec checks)

## Out of scope

- The `instanceof Error` gate on `onError` (its own issue)
- Usage accounting across tool rounds (`re-cinq/HALEngine#93`)