# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — The public `createChatOrchestrator` entry point already accepts a provider, a real tool registry, and lifecycle hooks, so the acceptance test can drive the complete multi-round turn and observe `afterModelResponse` directly.

## Done when these pass

- [ ] **reports the sum of every provider call in a tool turn while ignoring rounds with no usage** — Pins accumulation over every provider call, omission of rounds without usage, and `undefined` only when no round reports usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported round's token fields and pass the turn total to `afterModelResponse`.
- [ ] Keep the existing direct-response usage test unchanged and green.
- [ ] Give the hook's aggregate usage value an unambiguous public type, without `any`.
- [ ] Replace the spec's under-counting statement with the aggregate semantics and record this consumer-visible change in the changelog.

## Out of scope

- Audit or billing storage, token accounting outside provider calls, and changes to providers' stop-chunk usage shape.