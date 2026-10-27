# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` and its `afterModelResponse` hook are an existing seam exercised by the real tool-round loop.

## Done when these pass

- [ ] **Usage covers every provider call** — a turn with two tool rounds reports the summed usage of all three provider calls.
  `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Add a scripted-provider acceptance test that drives two tool rounds and asserts the summed usage reaches the hook.
- [ ] Replace the spec's recorded under-counting behavior with the aggregate behavior and link it to the acceptance test.

## Out of scope

- Billing or audit records created by consumers of the hook.
- Usage from sources other than provider calls made by the orchestrator.