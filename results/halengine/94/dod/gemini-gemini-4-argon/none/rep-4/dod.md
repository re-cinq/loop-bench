# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` via `options.hooks` and exposes `processMessage`, so the acceptance test calls the real orchestrator entry point with a throwing `beforeSession` hook today and fails because `onError` and `afterSession` are skipped.

## Done when these pass

- [ ] **ChatOrchestrator when beforeSession throws runs onError and afterSession in order and still rejects with the thrown error** — When `beforeSession` throws an `Error`, `onError` fires with `(session, error)`, `afterSession` runs after it with `(session)`, no intermediate turn hooks or provider calls run, and `processMessage` still rejects with the thrown error.
  `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Update any shifted line numbers in `specs/hal-engine-config-hooks/spec.md` and record the behaviour change in `CHANGELOG.md` under `## [Unreleased]`.

## Out of scope

- The `instanceof Error` gate on `onError` for non-`Error` rejections.
- Usage accounting across multiple tool rounds in `afterModelResponse` (HALEngine#93).