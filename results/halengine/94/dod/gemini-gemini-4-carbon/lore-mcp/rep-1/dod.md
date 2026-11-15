# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`), so the acceptance test calls `processMessage` directly with real hook callbacks and fails today because `beforeSession` runs outside the `try`/`finally` block.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws, and rejects unchanged** — When `beforeSession` throws, `onError` fires with `(session, error)` followed by `afterSession` with `(session)`, no user-input or model-response hooks run, and `processMessage` still rejects with the original error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `hooks?.beforeSession(session)` call inside the `try` block at the start of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`) while still propagating to the caller.
- [ ] Keep all existing tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` passing without editing them.
- [ ] Repoint any shifted `src/orchestration/chatOrchestrator.ts` line anchors in `specs/hal-engine-config-hooks/spec.md` if moving `beforeSession` changes line numbers.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing what changes for an existing consumer when `beforeSession` throws.

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (tracked separately).
- Summing usage accounting across tool rounds in `afterModelResponse` (re-cinq/HALEngine#93).