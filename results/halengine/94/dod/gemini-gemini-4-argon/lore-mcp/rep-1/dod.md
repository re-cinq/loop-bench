# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`, and intermediate turn hooks) through `ChatOrchestratorOptions.hooks`, so the acceptance test calls `orchestrator.processMessage` directly and fails on the missing `onError` and `afterSession` invocations today.

## Done when these pass

- [ ] **ChatOrchestrator beforeSession failure lifecycle > runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws an `Error`, `onError` fires with `(session, error)`, `afterSession` fires next with `(session)`, no user-input or model-response hooks run, and `processMessage` still rejects to the caller with the thrown error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `if (hooks?.beforeSession) await hooks.beforeSession(session);` call inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so a throw from `beforeSession` reaches `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Keep existing non-throwing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the `beforeSession` error-path guarantee (`onError` and `afterSession` now run when `beforeSession` throws).

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (tracked in its own issue)
- Summing token `usage` across multiple tool rounds in `afterModelResponse` (HALEngine#93)