# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes the `hooks` seam through `ChatOrchestratorOptions.hooks`, so the acceptance test calls `processMessage` directly with a throwing `beforeSession` hook and fails on the missing `onError` and `afterSession` invocations.

## Done when these pass

- [ ] **when beforeSession throws runs onError with the session and error, then afterSession, and still rejects** — when `beforeSession` throws an `Error`, `onError(session, error)` and `afterSession(session)` fire in order without running any intermediate turn hooks, and the rejection still propagates to the caller
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession` and `saveSession`)
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining that `onError` and `afterSession` now run when `beforeSession` throws, and that `afterSession` cannot assume `beforeSession` finished allocating

## Out of scope

- The `error instanceof Error` gate on `onError`
- Summing token usage across tool rounds in `afterModelResponse` (HALEngine#93)