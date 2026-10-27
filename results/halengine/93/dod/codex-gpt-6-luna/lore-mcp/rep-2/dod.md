# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — `createChatOrchestrator` exposes the real hook seam, and a scripted provider can drive multiple tool rounds without doubles. The acceptance test asserts that `afterModelResponse` reports the sum for every provider call.

## Done when these pass

- [ ] **reports usage from every provider call in a turn with two tool rounds** — the hook receives the accumulated input, output, and total token counts across all calls.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate usage from each provider call and pass the turn total to `afterModelResponse`.
- [ ] Preserve the existing no-tool usage behavior and handle rounds with missing usage safely.
- [ ] Update the public hook type, spec, and changelog to make the total unambiguous.

## Out of scope

- Token accounting outside provider calls made by the orchestrator.
- The stop chunk's own usage shape, audit records, or billing integrations.