# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` already exposes the lifecycle seam, so the acceptance test exercises a real orchestrator with its shipped mock provider and failing hook.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting the caller** — a failed `beforeSession` preserves its rejection while `onError` receives the same session and error, followed by `afterSession` for that session.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` block so its failure enters the existing `catch` and `finally`.
- [ ] State in the hook spec that `afterSession` runs after a failed `beforeSession` and must tolerate a session that did not reach later turn work.
- [ ] Add a CHANGELOG migration note for consumers whose cleanup hook previously did not run on this path.

## Out of scope

- The `instanceof Error` gate on `onError` and usage accounting across tool rounds.