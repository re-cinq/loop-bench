# Definition of Done

> For a turn that called tools, it is the last leg of several, and the earlier rounds — including the one carrying the customer's question and the full tool results — are not counted anywhere. A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — The `afterModelResponse` hook already exists and is called from `chatOrchestrator.ts:L148`. The seam is the assignment `lastUsage = outcome.usage ?? lastUsage` at line 117: instead of overwriting with the latest round's usage, it should accumulate across all rounds.

## Done when these pass

- [ ] **accumulates usage from every provider call across multiple tool rounds** — A turn with tool calls reports the sum of usage from all provider calls, not just the final one.
  `src/orchestration/chatOrchestrator.usage-accumulation.acceptance.test.ts`
- [ ] **reports exactly what it reports today when no tool calls occur** — Backward compatibility: a simple turn without tool calls receives the same usage value it does now.
  `src/orchestration/chatOrchestrator.usage-accumulation.acceptance.test.ts`
- [ ] **handles rounds with no usage reported, accumulating only those that reported** — When some rounds lack usage data, only the rounds with data contribute to the sum; no `undefined` or `NaN` results.
  `src/orchestration/chatOrchestrator.usage-accumulation.acceptance.test.ts`
- [ ] **reports undefined when no rounds report any usage** — Preserves the current behavior when no usage is reported at all.
  `src/orchestration/chatOrchestrator.usage-accumulation.acceptance.test.ts`
- [ ] **accumulates usage from two tool rounds with distinct token counts** — Multiple rounds with different token counts accumulate correctly.
  `src/orchestration/chatOrchestrator.usage-accumulation.acceptance.test.ts`

## Facets

- [ ] Decide whether to pass the accumulated sum (simpler, breaking change for consumers relying on `lastUsage` being the final round only) or pass both sum and breakdown (wider surface, more faithful). Record the decision and rationale in the issue.
- [ ] Accumulate usage across all rounds instead of overwriting: replace `lastUsage = outcome.usage ?? lastUsage` logic with a helper that sums usage objects, handling `undefined` safely.
- [ ] Update the type signature of `afterModelResponse` hook parameter to clarify whether it receives a sum or per-round data (per acceptance criterion 4).
- [ ] Update `specs/hal-engine-config-hooks/spec.md` line 28 to describe the new behavior (replacing the current "under-counts" statement).
- [ ] Add CHANGELOG entry documenting the change in what an existing consumer will record (per acceptance criterion 5).

## Out of scope

- The audit entry or billing record itself (consumer's concern)
- Token accounting for anything other than provider calls
- The `stop` chunk's `usage` shape (providers already populate it)