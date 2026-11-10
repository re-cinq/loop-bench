# Definition of Done

> `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone. For a turn that answered directly, that is the whole turn. For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The `afterModelResponse` hook is the existing lifecycle seam that receives turn usage; acceptance tests drive multi-round turns through `createChatOrchestrator` with scripted providers to assert token accumulation across all provider calls.

## Done when these pass

- [ ] **accumulates usage across every provider call in a multi-round tool turn** — a turn driven through two tool rounds reports usage covering every provider call in that turn, asserted against a scripted provider whose rounds report known, different token counts
      `src/orchestration/usageReporting.acceptance.test.ts`

- [ ] **sums usage across rounds when some rounds report no usage** — a provider that reports no usage on some rounds does not make the total undefined or NaN, and the rounds that reported are still counted toward the total
      `src/orchestration/usageReporting.acceptance.test.ts`

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, accumulate `inputTokens`, `outputTokens`, and `totalTokens` across all provider calls into a running total instead of overwriting with `lastUsage`
- [ ] Pass `undefined` to `afterModelResponse` when no provider calls reported usage
- [ ] Update `specs/hal-engine-config-hooks/spec.md` to document accumulated usage reporting and remove the out-of-scope under-counting note
- [ ] Add a CHANGELOG entry for the MINOR behavior change in `afterModelResponse` usage reporting

## Out of scope

- The audit entry or billing record itself, which is a consumer's concern
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape, which providers already populate and this issue only aggregates