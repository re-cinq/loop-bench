# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already accepts `OrchestratorHooks` through `options.hooks`, so an acceptance test can install `beforeSession`, `onError`, and `afterSession` directly today and fail on the missing error and cleanup hook invocations.

## Done when these pass

- [ ] **runs onError then afterSession and still rejects when beforeSession throws** — When `beforeSession` throws an `Error`, `onError` fires with `(session, error)` followed by `afterSession` with `(session)`, no subsequent turn phase or provider call executes, and `processMessage` still rejects with the thrown `Error`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` await inside the `try` block of `processMessageStream` in `src/orchestration/chatOrchestrator.ts` so a thrown `Error` triggers `onError(session, error)` in `catch`, runs `afterSession(session)` in `finally`, and rethrows to the caller.
- [ ] Keep existing non-throwing `beforeSession` and hook-ordering tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` unedited and green.
- [ ] Keep `specs/hal-engine-config-hooks/spec.md` anchors synced if `src/orchestration/chatOrchestrator.ts` line numbers shift, and add an entry under `## [Unreleased]` in `CHANGELOG.md` noting that `onError` and `afterSession` now run when `beforeSession` throws.

## Out of scope

- The `instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (tracked in its own issue).
- Usage accounting across multiple tool rounds in `afterModelResponse` (HALEngine#93).