# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` and runs the turn lifecycle through `processMessage` and `processMessageStream`, so the acceptance test calls the real entry point today and fails directly because `onError` and `afterSession` are skipped when `beforeSession` throws.

## Done when these pass

- [ ] **runs onError then afterSession and rethrows when beforeSession throws** — When `beforeSession` throws an `Error`, no downstream input, prompt, or provider step runs, `onError` fires with `(session, error)` followed by `afterSession` with `session`, and `processMessage` still rejects to the caller with the thrown `Error`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `hooks?.beforeSession(session)` call inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` (`onError` and rethrow) and `finally` (`afterSession` and session save).
- [ ] Keep existing non-throwing `beforeSession` and hook-order tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited.
- [ ] Confirm `specs/hal-engine-config-hooks/spec.md` states what `afterSession` can assume about how much of the turn happened when `beforeSession` threw.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing the observable change for consumers whose `beforeSession` throws.

## Out of scope

- The `instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts` (owned by its own issue).
- Usage accounting across tool rounds in `afterModelResponse` (re-cinq/HALEngine#93).