# Definition of Done

> `afterModelResponse` is the hook a deployer reaches for when they need to record what a turn cost — an audit entry, a billing line, a usage budget. It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere.

**Strategy: `direct`** — The `afterModelResponse` hook is already called with a `lastUsage` parameter that can be changed. The orchestrator loop at line 107-148 of `chatOrchestrator.ts` maintains this value and passes it to the hook. We can accumulate usage across rounds by summing the token counts, with the hook receiving the total.

## Done when these pass

- [ ] **accumulates usage across multiple tool rounds and reports the total** — A turn driven through two tool rounds with different known usage values reports the sum of all rounds to the hook, not just the last round's usage
      `src/orchestration/usage-accumulation.acceptance.test.ts`
- [ ] **reports usage from single round turn unchanged for backward compatibility** — A turn with no tool calls or a single provider call reports the same usage it does today, unchanged
      `src/orchestration/usage-accumulation.acceptance.test.ts`
- [ ] **accumulates available usage when some rounds report no usage** — When only some rounds report usage, the hook receives the sum of available rounds without `undefined` or `NaN`
      `src/orchestration/usage-accumulation.acceptance.test.ts`
- [ ] **handles turn with no usage reported on any round** — When no round reports usage, the hook receives `undefined` rather than `NaN` or `0`
      `src/orchestration/usage-accumulation.acceptance.test.ts`

## Facets

- [x] Accumulate usage across rounds by summing `inputTokens`, `outputTokens`, and `totalTokens` from each round's `outcome.usage`
- [x] Change the `afterModelResponse` hook signature or implementation to receive the accumulated total usage
- [x] Verify the type signature makes it unambiguous that the value is a sum (consider a new type or updated documentation)
- [x] Update `specs/hal-engine-config-hooks/spec.md` to replace the under-counting note with the new accumulated behavior
- [x] Add CHANGELOG entry documenting the behavior change and MINOR version bump
- [x] Ensure all existing tests continue to pass, especially the single-round cases

## Out of scope

- The choice between accumulating total vs passing both sum and per-round breakdown (pick one and make the signature say which)
- Audit entry or billing record implementation (consumer concern)
- Token accounting beyond provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape (providers populate this)