# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider, tool registry, and hooks, so a scripted provider can drive the public orchestration path through multiple rounds and observe the usage delivered to `afterModelResponse`.

## Done when these pass

- [ ] **reports the sum of usage from every provider call in a tool-driven turn** — two tool rounds and a final provider response report the combined token counts to `afterModelResponse`.
      `src/orchestration/usageAcrossRounds.acceptance.test.ts`

## Facets

- [ ] Add a scripted-provider acceptance test for summed usage across two tool rounds and the final provider call.
- [ ] Accumulate reported usage across rounds and deliver an unambiguous total through the hook signature.
- [ ] Preserve the existing no-tool usage behavior and define missing-usage behavior.
- [ ] Update the hook spec and changelog to explain the new value observed by existing consumers.

## Out of scope

- Usage accounting outside provider calls made by the orchestrator.
- The `stop` chunk's own usage shape.
- Consumer audit entries, billing records, or budget enforcement.