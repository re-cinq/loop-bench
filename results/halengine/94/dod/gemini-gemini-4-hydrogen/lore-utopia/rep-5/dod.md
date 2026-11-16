# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already exposes `options.hooks` (`beforeSession`, `onError`, `afterSession`) and drives the turn through `processMessage`, so the acceptance test calls the real orchestrator entry point directly and fails on the missing `try`/`catch`/`finally` coverage around `beforeSession`.

## Done when these pass

- [ ] **runs onError then afterSession and still rejects when beforeSession throws** — when `beforeSession` throws an `Error`, `onError` fires with `(session, error)`, `afterSession` fires after `onError` with `session`, no later turn hooks (`beforeUserInput`, `afterUserInput`, `beforeModelResponse`, `afterModelResponse`) execute, and the caller still receives the original rejection
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError`) and `finally` (`afterSession`) while still rejecting to the caller
- [ ] Keep existing non-throwing `beforeSession` and lifecycle tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited
- [ ] In `specs/hal-engine-config-hooks/spec.md`, remove the `beforeSession` recorded-flaw bullet from `## Measured semantics — out of scope` (updating `three properties` to `two properties`) and verify the new guarantee bullet under `## Installing hooks through config` states what `afterSession` can assume about how much of the turn happened
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` explaining the fix and noting for existing consumers that `afterSession` now also runs when `beforeSession` fails

## Out of scope

- The `instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (separate issue)
- Usage accounting across tool rounds in `afterModelResponse` (`HALEngine#93`)