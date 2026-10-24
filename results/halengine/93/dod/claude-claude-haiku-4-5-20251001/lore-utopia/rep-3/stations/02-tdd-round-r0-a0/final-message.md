Branch is pushed and up to date.

**Summary of the round:**

- **RED**: Added one test in `orchestratorHelpers.test.ts` — `sums two usage records field-by-field` — which failed because `addUsage` wasn't exported.
- **GREEN**: Added `addUsage(a, b)` to `orchestratorHelpers.ts` (returns undefined if both undefined, either value if one is undefined, field-by-field sum otherwise). Changed `chatOrchestrator.ts` line 117 from `outcome.usage ?? lastUsage` to `addUsage(lastUsage, outcome.usage)`.
- **REFACTOR**: No changes needed — implementation was clean from the start.
- Updated `specs/hal-engine-config-hooks/spec.md` to replace the under-counting note with the new summing behavior, and added a CHANGELOG entry explaining what consumers will observe.
- Ticked 3 of 4 DoD facets (type-signature clarity facet remains for the next round).

**Unrelated smells noticed** (not acted on):
- `orchestratorHelpers.ts` has no test for `extractUsage` or `extractStopReason` — low-risk since they're one-liners but worth covering.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"addUsage helper + orchestrator accumulation across rounds","tdd_next":"ensure type signature of afterModelResponse makes summing semantics unambiguous (no any in public API)"}}