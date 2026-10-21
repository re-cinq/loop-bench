# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `createChatOrchestrator` accepts a real scripted provider, tool registry, and `afterModelResponse` hook, so the reported round aggregation can be observed through the existing entry point.

## Done when these pass

- [ ] **reports usage covering every provider call in the turn** — a turn with two tool rounds reports the sum of usage from all three provider calls.
      `src/orchestration/usage-across-rounds.acceptance.test.ts`

## Facets

- [ ] Accumulate usage reported by each provider call and pass the total to `afterModelResponse`.
- [ ] Keep the no-tool turn's reported usage unchanged.
- [ ] Preserve reported usage when some rounds omit it, and report nothing when no round reports usage.
- [ ] Make the hook's usage type unambiguous and update the spec and changelog.

## Out of scope

- Audit or billing records implemented by hook consumers.
- Token accounting beyond provider calls made by the orchestrator.
- The `stop` chunk's own usage shape.