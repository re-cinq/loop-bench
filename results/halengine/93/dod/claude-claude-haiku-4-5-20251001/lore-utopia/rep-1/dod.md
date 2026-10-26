# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The hook call already exists as a seam at `chatOrchestrator.ts#L148`. The acceptance test can install a hook and assert on what it receives, and the implementation will accumulate `lastUsage` across all rounds instead of replacing it.

## Done when these pass

- [ ] **reports accumulated usage across multiple tool rounds, not just the last** — A turn with two tool rounds, each reporting different known token counts, passes the summed total to the hook's usage parameter.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **reports exact same usage for a turn with no tool calls** — A single-round turn (no tool calls) reports the usage exactly as received from the provider, pinned by the existing test staying green.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **handles missing usage in some rounds without producing NaN or undefined** — When one round reports usage and another does not, the hook receives the usage from the round that reported, with no NaN or undefined in the fields.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

- [ ] **handles both rounds reporting no usage without producing NaN or undefined** — When no round reports usage, the hook receives undefined, not NaN or a partial object.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Modify `chatOrchestrator.ts` to accumulate usage from each round instead of replacing `lastUsage`
- [ ] Add a helper function to sum usage objects safely, handling undefined/missing rounds
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to replace the line describing the current under-counting behavior with the new behavior
- [ ] Add a CHANGELOG entry describing the behaviour change for `afterModelResponse` hook consumers

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate
- Changes to the public API type signature (the ticket asks to decide on the shape, but the type decision is separate)