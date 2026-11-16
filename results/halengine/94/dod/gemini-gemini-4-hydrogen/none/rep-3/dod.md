# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`), so the acceptance tests can call `orchestrator.processMessage` directly and observe the missing `onError` and `afterSession` invocations today.

## Done when these pass

- [ ] **fires onError with the session and error and still rejects to the caller when beforeSession throws** — confirms `onError` receives `(session, error)` and the original rejection still reaches the caller when `beforeSession` throws
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **fires afterSession after onError and skips later turn hooks and provider calls when beforeSession throws** — confirms `afterSession` runs after `onError` with `session` while `beforeUserInput`, `afterUserInput`, `beforeModelResponse`, `afterModelResponse`, and `provider.sendMessage` do not execute
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession` and `saveSession`)
- [ ] Update `specs/hal-engine-config-hooks/spec.md` (already updated with the new guarantee and acceptance-test citations; verify spec anchors after any edits to `chatOrchestrator.ts`)
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining the behaviour change for existing consumers whose `beforeSession` can throw
- [ ] Verify existing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` remain green without edits

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`
- Usage accounting across tool rounds (`HALEngine#93`)