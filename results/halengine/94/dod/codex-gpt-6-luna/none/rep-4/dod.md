# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts lifecycle hooks directly. One acceptance test covers the rejection and both callbacks using the real orchestrator.

## Done when these pass

- [ ] **preserves the rejection and runs onError and afterSession with the original session** — a thrown `beforeSession` error reaches the caller unchanged, `onError` receives that error and session, and `afterSession` receives the session.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Keep the caller's rejection unchanged when `beforeSession` fails.
- [ ] Run `onError` and `afterSession`; specify that the turn may not have started when `afterSession` runs.

## Out of scope

- The `instanceof Error` gate for other hook failures and usage accounting across tool rounds.
- CHANGELOG and production implementation changes are for the implementation round.