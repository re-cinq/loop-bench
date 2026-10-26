# Definition of Done

> Report usage across every tool round, not just the last

**Strategy: `direct`** — The seam exists in `chatOrchestrator.ts` where `lastUsage` is managed; the accumulation logic can be implemented directly by changing how usage is combined across rounds instead of being overwritten.

## Done when these pass

- [ ] **accumulates usage across multiple tool rounds, reporting the sum to afterModelResponse** — Reports the sum of `inputTokens`, `outputTokens`, and `totalTokens` from all provider calls across tool rounds, not just the final round
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

- [ ] **handles partial usage gracefully: rounds that report no usage are skipped, not breaking accumulation** — Rounds with no usage report do not cause `undefined` or `NaN` in the accumulated total; only reported rounds are counted
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

- [ ] **maintains backward compatibility: a turn with no tool calls reports usage exactly as before** — A single-round turn with no tools reports the provider's usage unchanged, preserving backward compatibility
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

- [ ] **reports no usage when no rounds report usage** — When no rounds report usage, the hook receives `undefined`, not NaN or an accumulated zero
  `src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`

## Facets

- [x] Implement usage accumulation: change `lastUsage = outcome.usage ?? lastUsage` to sum token counts across rounds
- [x] Ensure partial/missing usage is handled: if a round has no usage, skip it in the sum
- [x] Verify backward compatibility: single-round turns unchanged
- [x] Update type signature if needed to clarify the accumulated behavior
- [x] Update `specs/hal-engine-config-hooks/spec.md` to document the new behavior
- [x] Update CHANGELOG with the behavior change

## Out of scope

- The internal billing or audit implementation using this hook
- Token accounting for anything other than the provider calls the orchestrator makes
- The `stop` chunk's own `usage` shape