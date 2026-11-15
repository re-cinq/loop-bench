# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` is the existing seam; calling `processMessage` with `beforeSession`, `onError`, and `afterSession` hooks observes the missing error and cleanup calls directly.

## Done when these pass

- [ ] **fires onError with session and error and still rejects on throw** — throwing an `Error` from `beforeSession` invokes `onError(session, error)` with the same session and error instance while still rejecting the caller
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`
- [ ] **runs onError then afterSession and skips turn hooks on throw** — throwing from `beforeSession` runs `onError` followed by `afterSession(session)` without invoking `beforeUserInput`, `afterUserInput`, `beforeModelResponse`, or `afterModelResponse`
  `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `processMessageStream` (`src/orchestration/chatOrchestrator.ts`)
- [ ] Verify `specs/hal-engine-config-hooks/spec.md` states what an `afterSession` hook can assume about turn progress when `beforeSession` throws
- [ ] Add an `## [Unreleased]` entry in `CHANGELOG.md` describing the lifecycle change for consumers whose `beforeSession` throws
- [ ] Verify existing non-throwing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` remain green and unedited

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (tracked in its own issue)
- Summing `usage` across tool rounds for `afterModelResponse` (HALEngine#93)