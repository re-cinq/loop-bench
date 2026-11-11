# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` and `OrchestratorHooks` already expose the hook lifecycle seam directly through `processMessage`.

## Done when these pass

- [ ] **ChatOrchestrator hooks — beforeSession throw runs onError then afterSession when beforeSession throws, and still rejects to the caller** — When `beforeSession` throws an `Error`, `onError` fires with `(session, error)`, `afterSession` fires with `(session)` before any turn hook (`beforeUserInput`, provider stream, etc.) runs, and `processMessage` still rejects to the caller with that error.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw from `beforeSession` reaches `catch` (`onError`) and `finally` (`afterSession`).
- [ ] Keep existing non-throwing `beforeSession` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` green and unedited.
- [ ] Verify `specs/hal-engine-config-hooks/spec.md` states the guarantee and what `afterSession` can assume about how much of the turn happened when `beforeSession` throws, and add a `CHANGELOG.md` entry under `## [Unreleased]` describing the behaviour change for existing consumers.

## Out of scope

- The `instanceof Error` gate on `onError` (tracked in its own issue)
- Usage accounting across tool rounds (HALEngine#93)