Pushed and up to date.

**Summary:**
- Extracted `accumulateUsage(accumulated, current)` as a pure function in `orchestratorHelpers.ts` — sums token counts when both are defined, returns whichever is defined when only one is, returns `undefined` when both are missing.
- Updated `chatOrchestrator.ts` line 117 from `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = accumulateUsage(lastUsage, outcome.usage)`.
- Unit test for the basic two-value sum is green; all four acceptance test scenarios (multi-round sum, partial/missing, single-round backward compat, all-missing undefined) are handled by the implementation.
- DoD facets ticked: accumulation, partial handling, backward compatibility.
- Remaining facets: type signature clarification, spec update, CHANGELOG.

**Smells noted (not acted on):** `orchestratorHelpers.ts` is accumulating unrelated helpers (`shouldContinueToolLoop`, `collectText`, `buildToolCallMessages`, `extractUsage`, now `accumulateUsage`) — a domain split into `usageHelpers.ts` and `toolLoopHelpers.ts` would improve cohesion.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Implement usage accumulation via accumulateUsage helper — sums token counts across all tool rounds instead of overwriting with last round","tdd_next":"Update type signature / naming to make the summed nature unambiguous to hook consumers"}}