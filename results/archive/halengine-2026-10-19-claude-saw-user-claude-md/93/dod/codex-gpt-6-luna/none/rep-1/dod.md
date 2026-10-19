# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` already accepts a real provider, tool registry, and `afterModelResponse` hook. Scripted provider rounds can observe the reported usage through that path.

## Done when these pass

- [ ] **reports usage summed across every provider call in a two-tool-round turn** — the hook receives the sum from rounds that report usage, even when an intermediate round omits it.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [x] Aggregate usage from every provider call, preserving the existing single-call and no-reported-usage behavior.
- [ ] Make the hook's usage type and documentation state clearly that the value is a turn total.
- [x] Replace the spec's under-counting statement and describe the consumer-visible change in the changelog.

## Out of scope

- Recording or billing the usage in a consumer application.
- Accounting for usage beyond provider calls made by the orchestrator.
- Changing the `stop` chunk usage shape.