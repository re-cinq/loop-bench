# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` already calls `beforeSession` and exposes the rejection to its caller. The acceptance test observes that path with real hooks and the repository's mock provider.

## Done when these pass

- [ ] **reports the original error and runs afterSession on the partially initialized session** — a failed `beforeSession` rejects with the original error, then `onError` receives that error and session before `afterSession` receives the session.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move `beforeSession` inside the orchestrator's `try` so its rejection reaches `catch` and `finally`.
- [ ] Keep the spec's failed-setup guarantee and explain that `afterSession` may receive a partially initialized session.
- [ ] Add a CHANGELOG entry explaining the new hook calls to existing consumers.
- [ ] Keep the existing successful-session hook tests green and pass the ticket's CI gates.

## Out of scope

- Calling `onError` for values that are not `Error` instances.
- Usage accounting across tool rounds.