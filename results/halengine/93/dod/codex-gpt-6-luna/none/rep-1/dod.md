# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` and `afterModelResponse` are an existing seam. A scripted provider and real tool registry can drive multiple rounds and assert the usage exposed to the hook.

## Done when these pass

- [x] **Usage across tool rounds** — the hook reports aggregate usage from every provider call in a turn with two tool rounds.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [x] Aggregate usage reported by provider calls across the turn for the hook.
- [x] Document the resulting hook semantics in the config hooks spec and note the consumer-visible change in the changelog.

## Out of scope

- Usage for turns without tool calls, which remains covered by the existing single-round test.
- Provider stop chunk usage shape, billing records, and accounting outside provider calls made by the orchestrator.