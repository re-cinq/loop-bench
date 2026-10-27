# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider and tool registry, and `afterModelResponse` exposes the usage received by deployers. A scripted provider can drive two tool rounds and observe the hook without a double.

## Done when these pass

- [ ] **reports the sum of usage from every provider call in a two-tool-round turn** — pins that the hook reports usage accumulated from both tool rounds and the final provider call.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **counts reported rounds when an intervening provider call omits usage** — pins that rounds without usage do not erase usage reported by other provider calls.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Replace last-round usage with an explicit accumulated usage value across provider calls.
- [ ] Make the hook's usage type state clearly that the value is a sum.
- [ ] Document the changed usage behavior in the spec and changelog, including the consumer-visible increase for tool turns.

## Out of scope

- No-tool turns retain their current usage behavior.
- No audit or billing record implementation.
- No aggregation of tool output or stop-chunk usage beyond provider-call usage.