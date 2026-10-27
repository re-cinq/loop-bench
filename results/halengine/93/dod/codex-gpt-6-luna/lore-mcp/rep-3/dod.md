# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real orchestrator entry point with injectable provider, tool registry, and hooks. A scripted provider can exercise multiple actual rounds and observe the usage delivered to `afterModelResponse`.

## Done when these pass

- [ ] **usage reported across tool rounds** — usage passed to `afterModelResponse` includes every provider call in a two-tool-round turn; rounds without usage contribute nothing, and no usage remains `undefined` when no round reports it. The existing no-tool usage test remains unedited.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Add the red acceptance test for summed usage and missing-usage rounds.
- [ ] Aggregate provider usage across rounds and make the hook's usage type unambiguous.
- [ ] Update the hooks spec and changelog to describe the new behavior and consumer-visible change.
- [ ] Run the existing no-tool usage test unchanged.

## Out of scope

- Billing or audit record implementation, accounting beyond provider calls made by the orchestrator, and the `stop` chunk's usage shape.