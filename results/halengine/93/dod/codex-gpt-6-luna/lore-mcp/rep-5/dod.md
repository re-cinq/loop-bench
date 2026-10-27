# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` and its `afterModelResponse` hook are an existing real entry point. A scripted provider and real tool registry can drive multiple tool rounds without doubles.

## Done when these pass

- [ ] **reports summed usage from every provider call across multiple tool rounds** — A turn with two tool rounds reports usage summed from all three provider calls.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Accumulate provider usage across rounds and report the full-turn total to `afterModelResponse`.

## Out of scope

- Token accounting for usage beyond provider calls made by the orchestrator.
- The `stop` chunk's own usage shape.