# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` is the real lifecycle entry point, and the shipped deterministic provider supplies real values without a network dependency.

## Done when these pass

- [ ] **reports and cleans up a beforeSession failure before rejecting the same error** — a `beforeSession` failure reaches `onError`, then `afterSession`, and rejects with the same error and session/error arguments.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so its failure reaches the existing catch/finally path.
- [ ] Preserve the original rejection after `onError` and `afterSession` complete.
- [ ] Update the changelog for consumers and retain the spec's guarantee that cleanup can see a session whose later turn hooks did not run.

## Out of scope

- The `instanceof Error` gate on `onError` and usage accounting across tool rounds.