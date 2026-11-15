# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already exposes `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`) through `processMessage` and `processMessageStream`, so the acceptance tests exercise the real orchestrator entry point directly and fail on the missing `onError` and `afterSession` invocations.

## Done when these pass

- [ ] **fires onError with the session and error and still rejects when beforeSession throws** — ensures a throw from `beforeSession` still rejects to the caller while invoking `onError` with `(session, error)`.
      `src/orchestration/beforeSessionThrows.acceptance.test.ts`
- [ ] **fires afterSession after onError without running mid-turn hooks or the provider when beforeSession throws** — ensures `afterSession` runs after `onError` with `session` when `beforeSession` throws, and that mid-turn hooks and the provider never execute.
      `src/orchestration/beforeSessionThrows.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so throws from `beforeSession` enter `catch` and `finally`.
- [ ] Remove the obsolete `beforeSession` recorded-flaw bullet from `## Measured semantics — out of scope` in `specs/hal-engine-config-hooks/spec.md` (updating "three" to "two") now that `## When beforeSession throws` replaces it.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` explaining the change for consumers (`onError` and `afterSession` now run when `beforeSession` throws, and `afterSession` must tolerate unallocated state).
- [ ] Verify the existing non-throwing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` stay green without edits, along with the full CI verify suite.

## Out of scope

- The `error instanceof Error` gate on `onError` in the `catch` block (separate issue).
- Usage accounting across tool rounds in `afterModelResponse` (`HALEngine#93`).