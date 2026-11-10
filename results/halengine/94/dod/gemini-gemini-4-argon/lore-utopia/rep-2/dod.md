# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `hooks` (`beforeSession`, `onError`, `afterSession`) through `ChatOrchestratorOptions`, so the acceptance test calls `orchestrator.processMessage` directly and fails today because `beforeSession` runs outside the `try` block.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and still rejects to the caller** — when `beforeSession` throws an `Error`, `onError` fires with `(session, error)`, `afterSession` fires after it seeing the session untouched by the turn (`entries` containing only the initial `user` entry), no intermediate turn hooks run, and `processMessage` still rejects with the thrown error
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`)
- [ ] Keep existing non-throwing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` (`### Fixed` or `### Changed`) explaining that `onError` and `afterSession` now fire when `beforeSession` throws, and noting what `afterSession` can assume about the session state when `beforeSession` failed before the turn started

## Out of scope

- The `error instanceof Error` gate on `onError` in the `catch` block (tracked in its own issue)
- Summing `UsageMetadata` across tool rounds for `afterModelResponse` (HALEngine#93)