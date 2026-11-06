# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point; installing hooks and observing their call count is enough to prove both `onError` and `afterSession` are skipped today.

## Done when these pass

- [ ] **onError fires when beforeSession throws** — `onError` is called with the thrown error when `beforeSession` rejects, same argument shape as any other orchestrator failure
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **afterSession fires when beforeSession throws** — `afterSession` is called even when `beforeSession` rejects, so cleanup hooks do not leak resources allocated before the throw
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Move the `beforeSession` await inside the `try` block in `src/orchestration/chatOrchestrator.ts` so errors reach the `catch` and `finally`
- [ ] Verify the two new acceptance tests go green
- [ ] Update the `specs/hal-engine-config-hooks/spec.md` "Measured semantics" bullet for `beforeSession` — replace the recorded-flaw line with the new guarantee and state what `afterSession` can assume about how much of the turn happened
- [ ] Add a CHANGELOG entry describing the behaviour change for existing consumers
- [ ] Confirm the existing tests (non-acceptance) remain unedited and green

## Out of scope

- The `instanceof Error` gate on `onError` (tracked separately per the ticket's tech notes)
- Usage accounting across tool rounds (HALEngine#93)