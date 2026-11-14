# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`) via `options.hooks` and executes turns through `processMessage(session)`, so the acceptance test calls the real entry point today and fails directly on the missing `onError` and `afterSession` invocations.

## Done when these pass

- [ ] **fires onError and afterSession in order and still rejects when beforeSession throws** — When `beforeSession` throws an `Error`, `onError` fires with `(session, error)` followed by `afterSession` with `session`, no later turn hook or provider call runs, and `processMessage` still rejects with that `Error`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw from `beforeSession` reaches `catch` (`onError`) and `finally` (`afterSession`) while still rejecting to the caller.
- [ ] Keep a non-throwing `beforeSession` behaving identically, leaving existing tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` unedited and green, and repoint any shifted line numbers in `specs/hal-engine-config-hooks/spec.md` (`node scripts/repoint-spec-anchors.mjs`).
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` (`### Fixed`) explaining that `onError` and `afterSession` now fire when `beforeSession` throws and noting for existing consumers that `afterSession` can run when `beforeSession` threw before finishing allocation.

## Out of scope

- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (owned by its own issue).
- Summing `UsageMetadata` across tool rounds before passing usage to `afterModelResponse` (re-cinq/HALEngine#93).