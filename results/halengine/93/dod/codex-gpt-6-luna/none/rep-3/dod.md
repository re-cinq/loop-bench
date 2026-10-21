# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` is the real orchestrator entry point and accepts a scripted provider, tool registry and `afterModelResponse` hook. The test drives two tool rounds and observes the usage delivered to the hook.

## Done when these pass

- [ ] **Reports usage from every provider call across two tool rounds** — usage delivered to `afterModelResponse` covers all three provider calls in a turn with two tool rounds.
      `src/orchestration/chatUsage.acceptance.test.ts`

## Facets

- [ ] Accumulate or otherwise report usage from every provider call across tool rounds.

## Out of scope

- Turns with no tools, missing usage on some or all rounds, and changes to the public hook type or release documentation.