# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `processMessage` already exposes the rejection and invokes configured lifecycle hooks. One acceptance test can observe the original error and both hooks through that entry point.

## Done when these pass

- [ ] **rejects with the original error after onError and afterSession receive the session** — a failed `beforeSession` rejects with the same error, calls `onError` with that error and session, then calls `afterSession` with that session.
      `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so failure reaches `catch` and `finally`.
- [ ] Keep the existing non-throwing lifecycle tests green without editing them.
- [x] Document that `afterSession` can run after a partially completed `beforeSession` and cannot assume setup completed or the turn started.
- [ ] Add a CHANGELOG entry describing the new error and cleanup hook calls for existing consumers.

## Out of scope

- Non-`Error` throws through `onError` and usage accounting across tool rounds.