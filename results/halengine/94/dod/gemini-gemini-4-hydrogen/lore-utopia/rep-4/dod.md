# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` in `src/orchestration/chatOrchestrator.ts` already exposes the `OrchestratorHooks` seam (`beforeSession`, `onError`, `afterSession`) through `processMessage` and `processMessageStream`, so the acceptance test calls the real entry point directly.

## Done when these pass

- [ ] **runs onError then afterSession when beforeSession throws and still rejects** — verifies `onError(session, error)` and `afterSession(session)` both fire in order with the exact session and thrown error, no later turn hook or provider call runs, and the rejection still reaches the caller
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` block in `src/orchestration/chatOrchestrator.ts` so a throw reaches `catch` and `finally`.
- [ ] Confirm existing `beforeSession` and `full lifecycle order` tests in `src/orchestration/chatOrchestrator.test.ts` and `src/config.test.ts` remain green unedited.
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to remove the `beforeSession` flaw bullet from `## Measured semantics — out of scope` (changing "three properties" to "two properties") and state explicitly what `afterSession` can assume when `beforeSession` throws (no turn hooks or provider calls ran, and `beforeSession` may have failed before allocating).
- [ ] Add an entry under `## [Unreleased]` in `CHANGELOG.md` describing what changes for an existing consumer.

## Out of scope

- The `instanceof Error` gate on `onError` (tracked in its own issue).
- Usage accounting across tool rounds (`re-cinq/HALEngine#93`).