# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider, tool registry, and `afterModelResponse` hook, so the public orchestration path can expose usage from each provider round without doubles.

## Done when these pass

- [ ] **reports the sum of every provider call while ignoring rounds that omit usage** — A two-tool-round turn sums all three provider calls, counts the reported rounds when one omits usage, and reports nothing when all omit usage.
      `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate each provider call's reported token fields across the complete turn without manufacturing usage for an all-missing turn.
- [ ] Preserve the existing single-call `afterModelResponse` usage behaviour and its unedited test.
- [ ] Make the public hook type unambiguously describe turn-total usage without introducing `any`.
- [ ] Record the summed semantics in the config-hooks spec and the existing-consumer behaviour change in the changelog.
- [ ] Pass the repository's CI verification gates.

## Out of scope

- Audit or billing storage, accounting outside orchestrator provider calls, and changes to providers' `stop` chunk usage shape.