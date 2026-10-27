# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider, tool registry, and `afterModelResponse` hook, so a scripted provider can drive multiple tool rounds and observe the hook's usage argument without mocks or stubs.

## Done when these pass

- [ ] **reports the sum of usage from every provider call in a two-tool-round turn** — the hook receives aggregate input, output, and total token counts across all three provider calls.
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **counts reported rounds when another round omits usage and reports nothing when all rounds omit it** — missing usage does not produce `undefined` or `NaN` when another round reported, while an entirely unreported turn remains `undefined`.
      `src/orchestration/usageAggregation.acceptance.test.ts`
- [ ] **receives collected response text and usage** — the existing no-tool test remains unedited and pins the common path's current usage.
      `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Aggregate usage across rounds while preserving the existing `UsageMetadata` shape and an unreported turn's `undefined` value.
- [ ] Keep the no-tool path's reported usage unchanged.
- [ ] Update the public hook type, the config-hooks spec, and CHANGELOG with the consumer-visible meaning of the new sum.

## Out of scope

- Audit entries, billing records, and budgets consumed by deployers.
- Token accounting outside provider calls made by the orchestrator.
- The `stop` chunk's provider usage shape.