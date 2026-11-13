# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` and exposes `processMessage`, so the acceptance test calls the real orchestrator with a throwing `beforeSession` hook and fails directly on the absent `onError` and `afterSession` invocations.

## Done when these pass

- [ ] **runs onError then afterSession and rethrows when beforeSession throws** — When `beforeSession` throws an `Error`, no later turn hook or provider call runs, `onError` fires with `(session, error)` followed by `afterSession` with `(session)`, and `processMessage` rejects with that same error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` await inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `onError(session, error)` in `catch`, `afterSession(session)` in `finally`, and still rejects to the caller while leaving non-throwing behaviour and existing tests unchanged.
- [ ] Re-verify the `chatOrchestrator.ts#L...` line anchors in `specs/hal-engine-config-hooks/spec.md` after editing `src/orchestration/chatOrchestrator.ts`, and add an entry under `## [Unreleased]` in `CHANGELOG.md` describing what changes for an existing consumer.

## Out of scope

- Removing or changing the `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`
- Summing usage metadata across tool rounds in `afterModelResponse` (HALEngine#93)