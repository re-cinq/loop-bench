# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — `afterModelResponse` is an existing orchestrator hook, and a scripted provider can drive the real tool loop through every provider call. The acceptance test observes the usage value delivered to the hook.

## Done when these pass

- [ ] **Sums usage reported by every provider call in a turn** — usage from all reported calls across two tool rounds reaches `afterModelResponse` as the sum, even when one round reports no usage.
      `src/orchestration/usageAcrossToolRounds.acceptance.test.ts`

## Facets

- [ ] Add the failing tool-round usage acceptance test and establish its spec link.
- [ ] Define the hook usage type so summed turn usage is explicit to consumers.
- [ ] Replace the spec's under-counting description with the new behavior.
- [ ] Add a changelog entry describing the consumer-visible usage change and MINOR bump.

## Out of scope

- Auditing or billing records themselves.
- Token accounting outside provider calls made by the orchestrator.
- Aggregating the `stop` chunk's own usage shape.