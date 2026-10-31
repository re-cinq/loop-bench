# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real provider, tool registry, and hook, so the acceptance test can drive tool rounds through the running orchestrator and observe the hook argument.

## Done when these pass

- [ ] **afterModelResponse usage across tool rounds** — the hook receives totals across every provider call, ignoring unreported rounds without producing a fabricated total.
      `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

## Facets

- [ ] Accumulate each reported provider usage into the unambiguous public hook contract while preserving the existing no-tool behavior.
- [ ] Update the hook specification and changelog with the aggregation and migration impact.

## Out of scope

- Consumer audit or billing records, non-provider token accounting, and changes to the `stop` chunk usage shape.