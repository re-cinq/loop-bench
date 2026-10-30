# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` and its public `processMessage` entry point already accept a scripted provider, a real tool registry, and the deployed hook, so the complete multi-round behavior is directly observable.

## Done when these pass

- [ ] **reports the summed usage of every provider call while ignoring rounds with no usage** — two executed tool rounds report the sum of all provider calls that supplied usage, omit missing rounds, and leave usage absent when no round supplied it.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate `inputTokens`, `outputTokens`, and `totalTokens` across every provider call that reports usage.
- [ ] Preserve `undefined` when no provider call reports usage and preserve the existing single-call result unchanged.
- [ ] Name and type the hook argument as a total so its summed meaning is unambiguous without reading the implementation.
- [ ] Replace the spec's recorded under-counting behavior and record why a per-round breakdown was rejected.
- [ ] Add a `CHANGELOG.md` entry explaining that existing consumers now record the whole turn's larger total.

## Out of scope

- Audit or billing storage, token accounting outside orchestrator provider calls, and changes to providers' `stop` chunk usage shape.