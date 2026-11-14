# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts `OrchestratorHooks` directly via options, so the acceptance test drives `processMessage` with real hook callbacks and fails today because `beforeSession` throws above the `try`/`catch`/`finally` block in `src/orchestration/chatOrchestrator.ts`.

## Done when these pass

- [ ] **beforeSession hook failure lifecycle fires onError and afterSession in order and still rejects when beforeSession throws** — When `beforeSession` throws an `Error`, `onError` receives `(session, error)`, `afterSession` receives `session` with `entries` untouched and no downstream turn hook having run, and `processMessage` still rejects with that error.
      `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`) while still rethrowing to the caller.
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing what changes for an existing consumer whose `beforeSession` throws, and verify line anchors in `specs/hal-engine-config-hooks/spec.md` still resolve after editing `src/orchestration/chatOrchestrator.ts`.

## Out of scope

- The `error instanceof Error` gate on `onError` for non-`Error` rejections.
- Summing token usage across tool rounds in `afterModelResponse` (HALEngine#93).