# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — `createChatOrchestrator` is the real entry point for exercising the hook lifecycle. The acceptance test supplies real hooks and a provider, then observes the rejection and hook calls.

## Done when these pass

- [ ] **beforeSession failure acceptance** — a setup failure rejects with its original error, reaches `onError` and `afterSession` with the expected arguments, and does not start later turn hooks.
      `src/orchestration/beforeSessionFailure.acceptance.test.ts`

## Facets

- [ ] Run the acceptance test and confirm it fails because `beforeSession` is outside the error handling block.
- [ ] Update the spec to state the failure behavior and advise that `afterSession` may run after partial setup.
- [ ] Add the consumer-facing changelog note when implementing the behavior.

## Out of scope

- Non-`Error` rejection handling and tool-round usage accounting.
- Implementation changes; this round defines the executable acceptance contract.