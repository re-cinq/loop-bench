Branch is up to date and pushed. The round delivered:

- **RED**: Added `sums usage across both rounds when both report usage` to `chatOrchestrator.test.ts` — it failed because the old `lastUsage = outcome.usage ?? lastUsage` only kept the last round's value.
- **GREEN**: Added `addUsage()` helper and replaced the override with `accumulatedUsage = addUsage(accumulatedUsage, outcome.usage)`. All 25 tests pass.
- **Refactor**: Renamed `lastUsage` → `accumulatedUsage` for clarity; added one-line JSDoc on the hook member; added CHANGELOG entry noting the MINOR behavior change; ticked all three DoD facets.

No unrelated smells acted on (the `extractUsage` in `orchestratorHelpers.ts` silently returns the last usage from a stream — benign since each provider call emits exactly one stop chunk with usage, so not a smell to fix).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate usage per round in chatOrchestrator.ts and pass the sum","tdd_next":"acceptance green"}}