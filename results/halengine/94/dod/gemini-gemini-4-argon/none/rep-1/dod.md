# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` accepts `OrchestratorHooks` directly and `processMessage` drives the real turn lifecycle, so the acceptance test calls `processMessage` with a throwing `beforeSession` hook and fails on the absent `onError` and `afterSession` invocations today.

## Done when these pass

- [ ] **runs onError and afterSession and rethrows when beforeSession throws** — When `beforeSession` throws an `Error`, `onError` is called with `(session, error)`, `afterSession` is called with `(session)` after `onError`, neither `beforeUserInput` nor the provider runs, and `processMessage` still rejects with the thrown error.
  `src/orchestration/beforeSessionThrow.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers whose `afterSession` and `onError` hooks now run when `beforeSession` throws.

## Out of scope

- The `instanceof Error` gate on `onError` when a non-`Error` value is thrown.
- Summing token usage across tool rounds in `afterModelResponse` (HALEngine#93).