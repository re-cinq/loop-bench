# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` exposes `processMessage` and accepts real lifecycle hooks, so the failure path can be observed directly using the built-in provider.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure while preserving the rejection** — The same error reaches the caller and `onError`, followed by `afterSession` with the session, before later turn hooks run.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` into the orchestrator's error handling and cleanup path, preserving successful sessions.
- [ ] Document what cleanup hooks can assume after a failed `beforeSession`, including whether they can distinguish an unstarted session, and update the changelog for consumers.
- [ ] Keep the existing successful-session tests unedited and pass the repository's CI checks.

## Out of scope

- Handling non-`Error` throws in `onError` and accounting for usage across tool rounds.