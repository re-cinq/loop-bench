# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` directly and exposes both `processMessage` and `processMessageStream`, so the acceptance tests call the real orchestrator entry points and fail today because `beforeSession` throws outside the `try`/`catch`/`finally` block.

## Done when these pass

- [ ] **ChatOrchestrator when beforeSession throws › runs onError with the session and error, then afterSession, and still rejects** — when `beforeSession` throws an `Error`, `onError` fires with `(session, error)`, `afterSession` fires after it with `(session)`, and `processMessage` still rejects with that same `Error`.
  `src/orchestration/beforeSessionError.acceptance.test.ts`

- [ ] **ChatOrchestrator when beforeSession throws › runs afterSession on processMessageStream with no later hook or provider call** — when `beforeSession` throws on `processMessageStream`, no downstream turn hook or provider call runs, `onError` then `afterSession` both fire (with `afterSession` observing zero provider calls and no later turn hooks), and consuming the stream still rejects with that same `Error`.
  `src/orchestration/beforeSessionError.acceptance.test.ts`

## Facets

- [ ] Move the `if (hooks?.beforeSession) await hooks.beforeSession(session);` call inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` while leaving existing non-throwing hook tests unedited.
- [ ] Re-verify or repoint the remaining `chatOrchestrator.ts#L...` line references in `specs/hal-engine-config-hooks/spec.md` if moving `beforeSession` shifts lines in `src/orchestration/chatOrchestrator.ts`.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining that a throwing `beforeSession` hook now triggers `onError` and `afterSession` before rejecting, and that `afterSession` cleanup must not assume `beforeSession` completed.

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (tracked as its own issue).
- Usage accounting across multiple tool rounds in `afterModelResponse` (re-cinq/HALEngine#93).