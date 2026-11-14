# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` already accepts `OrchestratorHooks` (`beforeSession`, `onError`, `afterSession`) through `ChatOrchestratorOptions.hooks`, so the acceptance tests call `processMessage` and `processMessageStream` directly and fail today because `beforeSession` rejects above `try`.

## Done when these pass

- [ ] **ChatOrchestrator when beforeSession throws runs onError with the session and error, then afterSession, skips the rest of the turn, and still rejects** — when `beforeSession` throws an `Error`, no later turn hook or provider call runs, `onError(session, error)` fires with `(session, error)`, `afterSession(session)` fires after it, and `processMessage` rejects with the original `Error`.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **ChatOrchestrator when beforeSession throws runs afterSession on processMessageStream when beforeSession throws before completing setup** — `afterSession(session)` runs unconditionally on `processMessageStream` even when `beforeSession` fails mid-setup, releasing allocated state while leaving unallocated state untouched and propagating the rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `hooks?.beforeSession` call inside the `try` block in `processMessageStream` in `src/orchestration/chatOrchestrator.ts`, leaving existing non-throwing `beforeSession` tests unedited.
- [ ] Run `node scripts/repoint-spec-anchors.mjs` if editing `src/orchestration/chatOrchestrator.ts` shifts cited line numbers in `specs/hal-engine-config-hooks/spec.md`.
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing what changes for an existing consumer when `beforeSession` throws.

## Out of scope

- Changing `OrchestratorHooks.afterSession`'s signature (the spec defines that `afterSession(session)` runs unconditionally and must check whether resources were allocated).
- The `error instanceof Error` gate on `onError` in `src/orchestration/chatOrchestrator.ts`.
- Usage accounting across tool rounds (`afterModelResponse` receiving `lastUsage` rather than cumulative usage, HALEngine#93).