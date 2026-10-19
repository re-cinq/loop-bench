Branch is pushed and up to date. 

**Summary of this round:**
- **Facet closed**: "Update `chatOrchestrator.ts` to sum the usage across rounds instead of keeping only `lastUsage`"
- Introduced `accumulateUsage(previous, current)` in `orchestratorHelpers.ts` — returns `undefined` only when both sides are undefined, otherwise accumulates
- Replaced `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = accumulateUsage(lastUsage, outcome.usage)` in the round loop
- 7 tests pass (4 pre-existing + 3 new for `accumulateUsage`)
- 0 regressions written; 0 acceptance tests run directly

**Out-of-scope smell noticed** (not acted on): `chatOrchestrator.ts` line 148 still types `usage` in `afterModelResponse` as `UsageMetadata | undefined` via the `OrchestratorHooks` interface — the ticket also asks for a `TurnUsageMetadata` alias to make the accumulated nature unambiguous. That's a separate unchecked facet.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across rounds in chatOrchestrator","tdd_next":"introduce TurnUsageMetadata type alias for the hook parameter"}}