# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts `OrchestratorHooks` directly and drives `beforeSession`, `onError`, and `afterSession` inside `processMessageStream`, so the acceptance test calls `createChatOrchestrator(...).processMessage(session)` directly with real hooks and fails today because `beforeSession` sits above the `try`.

## Done when these pass

- [ ] **runs onError with session and error, then afterSession, and still rejects to the caller when beforeSession throws** — verifies that a throw in `beforeSession` still rejects to the caller, invokes `onError(session, error)` and `afterSession(session)` in order, and performs no downstream hooks or provider calls
  `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts`
- [ ] Verify the existing non-throwing `beforeSession` and lifecycle-order tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green without edits
- [ ] Repoint `#L150` / `#L148` anchors in `specs/hal-engine-config-hooks/spec.md` (`node scripts/repoint-spec-anchors.mjs`) if shifting `beforeSession` moves lines in `src/orchestration/chatOrchestrator.ts`
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining the change and what an `afterSession` hook can assume when `beforeSession` throws

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (tracked in its own issue)
- Usage accounting across tool rounds in `afterModelResponse` (`re-cinq/HALEngine#93`)