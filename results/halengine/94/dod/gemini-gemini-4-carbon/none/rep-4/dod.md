# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` through `ChatOrchestratorOptions.hooks`, so an acceptance test can invoke `processMessageStream` and `processMessage` directly with a throwing `beforeSession` and fail today because `onError` and `afterSession` never fire.

## Done when these pass

- [ ] **runs onError then afterSession and still rejects when beforeSession throws** — Pins that when `beforeSession` throws an `Error`, `onError(session, error)` and `afterSession(session)` run in order without running any intermediate lifecycle hook or provider call, and the thrown error still rejects at the caller across both `processMessageStream` and `processMessage`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`) while still rejecting at the caller.
- [ ] Keep existing non-throwing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` unedited, and run `node scripts/repoint-spec-anchors.mjs` if any cited lines in `src/orchestration/chatOrchestrator.ts` shift.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing the change for existing consumers, including that `afterSession` now runs after a failed `beforeSession` and cannot assume `beforeSession` completed.

## Out of scope

- Changing the `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (its own issue).
- Summing token `usage` across tool rounds in `afterModelResponse` (re-cinq/HALEngine#93).