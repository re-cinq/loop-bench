# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real `processMessage` entry point and accepts a real `ToolRegistry`, so scripted provider rounds can observe the hook without mocks or production seams.

## Done when these pass

- [ ] **reports usage summed across every provider call in a two-round tool turn** — the hook receives the input, output, and total token sums from both provider calls.
      `src/orchestration/usageReporting.acceptance.test.ts`
- [ ] **counts reported rounds without producing NaN and reports undefined when none report usage** — reported rounds remain counted when another round omits usage, while a turn with no usage remains absent.
      `src/orchestration/usageReporting.acceptance.test.ts`

## Facets

- [ ] Make the hook's usage type and documentation unambiguously describe the aggregate.
- [ ] Accumulate each provider round's reported usage and preserve the no-usage case.
- [ ] Update the linked spec and changelog to describe the changed value existing consumers record.

## Out of scope

- Audit or billing records, token accounting outside provider calls, and the `stop` chunk's usage shape.
- The existing no-tool behavior test, which remains unchanged and must continue to pass.