Perfect! I've successfully defined DONE for ticket #93 with executable acceptance tests. Here's what I created:

## Summary

I've written **4 acceptance tests** in `src/orchestration/reportUsageAcrossRounds.acceptance.test.ts` that define when ticket #93 is complete:

### Test Results

**Failing tests (the red bar for implementation):**
1. **accumulates usage from multiple tool rounds into a single total** — expects tokens summed across 2 rounds (150+125=275), gets only first round (150)
2. **accumulates reported usage when some rounds report none** — expects tokens from rounds 1 and 3 summed (100+30=130), gets only round 1 (100)

**Passing tests (existing behavior to preserve):**
3. **turn with no tool calls reports the same usage as before** — single-round turns unchanged
4. **turn with no usage reported on any round passes undefined to hook** — undefined input stays undefined

### Definition of Done

Created `.lore/dod.md` documenting:
- **Strategy**: `direct` — The `afterModelResponse` hook seam exists; the change is to accumulate usage on each round instead of replacing it
- **Central claim**: Quoted verbatim from the ticket about `lastUsage` under-counting for tool-heavy turns
- **Facets**: Accumulation logic, type clarification, spec/CHANGELOG updates

The red bar shows the current behavior (only last/first round kept) vs expected (tokens summed). Once implementation changes line 117 in `chatOrchestrator.ts` from `lastUsage = outcome.usage ?? lastUsage` to accumulation logic, these tests will pass and the ticket is done.

```
LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}
```