# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — I can call the orchestrator with a provider that simulates multiple tool rounds and verify that the `afterModelResponse` hook receives the aggregated usage.

## Done when these pass

- [ ] **reports aggregated usage across multiple tool rounds** — A turn with two tool rounds must report the sum of usage from both provider calls.
  `src/orchestration/usage-aggregation.acceptance.test.ts`

- [ ] **reports exactly the same usage for a single round turn** — A turn with no tool calls must report the same usage it does today, ensuring no regressions for simple turns.
  `src/orchestration/usage-aggregation.acceptance.test.ts`

- [ ] **handles partial usage reporting correctly** — If some rounds don't report usage, they shouldn't make the total undefined or NaN.
  `src/orchestration/usage-aggregation.acceptance.test.ts`

## Facets

- [ ] define aggregated usage type and update `afterModelResponse` signature
- [ ] accumulate usage in `chatOrchestrator.ts` loop
- [ ] update `specs/hal-engine-config-hooks/spec.md` to reflect new behavior
- [ ] update `CHANGELOG.md`

## Out of scope

- Token accounting for anything other than the provider calls.
- The `stop` chunk's own `usage` shape.
- Audit/billing implementation (consumer concern).