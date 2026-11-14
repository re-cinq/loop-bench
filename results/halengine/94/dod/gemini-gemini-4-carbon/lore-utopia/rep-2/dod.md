# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`) and exposes `processMessage` and `processMessageStream`, so the acceptance test calls the real entry points directly and fails today because `onError` and `afterSession` are skipped when `beforeSession` throws.

## Done when these pass

- [ ] **runs onError and afterSession and still rejects when beforeSession throws** — When `beforeSession` throws an `Error`, later turn hooks and the provider are skipped, `onError(session, error)` and `afterSession(session)` run in order with the session and thrown error, and the rejection still propagates to callers of both `processMessage` and `processMessageStream`.
  `src/orchestration/beforeSessionError.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`, rethrow) and `finally` (`afterSession`, `saveSession`) while leaving existing hook tests unedited.
- [ ] Update the `chatOrchestrator.ts#L148` and `chatOrchestrator.ts#L150` line anchors in `specs/hal-engine-config-hooks/spec.md` if moving `beforeSession` shifts those lines (`repoint-spec-anchors.mjs` skips specs whose anchor set differs from `origin/main`).
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining for package consumers that `onError` and `afterSession` now run when `beforeSession` throws (`afterSession` cannot assume `beforeSession` finished).

## Out of scope

- Changing the `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.
- Summing `UsageMetadata` across multiple tool rounds for `afterModelResponse` (`re-cinq/HALEngine#93`).