# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts lifecycle hooks via `OrchestratorHooks` and executes them during `processMessage`; calling `processMessage` when `beforeSession` throws fails on observable behavior today because neither `onError` nor `afterSession` is reached.

## Done when these pass

- [ ] **runs onError and afterSession when beforeSession throws** — When `beforeSession` throws, the rejection reaches the caller unchanged, `onError` fires with the error and session, and `afterSession` fires for cleanup.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the `try` block in `src/orchestration/chatOrchestrator.ts`.
- [ ] Add an entry to `CHANGELOG.md` under `## [Unreleased]` documenting the lifecycle guarantee when `beforeSession` throws.

## Out of scope

- The `instanceof Error` gate on `onError` (separate issue).
- Usage accounting across tool rounds (HALEngine#93).