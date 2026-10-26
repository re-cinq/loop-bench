Branch is up to date. The round is complete.

**What was done:**
- Added `accumulateUsage(accumulated, round)` to `orchestratorHelpers.ts` — sums `inputTokens`, `outputTokens`, and `totalTokens`; handles `undefined` on either side
- Changed `chatOrchestrator.ts` line 117 from `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = accumulateUsage(lastUsage, outcome.usage)` so every provider call's usage is summed across the turn
- Added changelog entry in [Unreleased] describing the consumer-visible behaviour change
- Ticked all facets in `.lore/dod.md`

**Out-of-scope smells noticed (not fixed):**
- `orchestratorHelpers.ts` `collectText` returns the full text but `chatOrchestrator.ts` also accumulates text directly in the loop via `responseText += outcome.text` — minor divergence, not a bug

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Aggregate usage across all tool rounds for afterModelResponse hook","tdd_next":"acceptance green"}}