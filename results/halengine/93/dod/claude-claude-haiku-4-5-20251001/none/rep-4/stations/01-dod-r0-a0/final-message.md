Perfect! I've successfully defined DONE for ticket #93 with executable acceptance tests. Here's a summary of what I've created:

## Summary

I've written **acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts` that define the ticket's requirements:

### Test Cases (4 total, 2 failing, 2 passing):

1. **FAIL: `accumulates usage from multiple tool rounds into a sum`** — A two-round tool turn with round 1 usage `{100, 20, 120}` and round 2 usage `{150, 30, 180}` currently receives `{150, 30, 180}` (just round 2), but should receive `{250, 50, 300}` (the sum).

2. **FAIL: `accumulates only from rounds that report usage, handling undefined in some rounds`** — A three-round turn where round 1 reports `{50, 10, 60}`, round 2 reports nothing, and round 3 reports `{75, 15, 90}` currently receives `{75, 15, 90}` (just round 3), but should receive `{125, 25, 150}` (sum of rounds 1 and 3).

3. **PASS: `reports the single round usage when a turn has no tool calls`** — Confirms the common case (no tools) remains unchanged from today's behavior.

4. **PASS: `reports undefined when no rounds report usage`** — Confirms that an all-undefined turn results in undefined, not 0 or NaN.

### Definition of Done

I've committed `.lore/dod.md` which:
- Quotes the ticket's central claim verbatim from the issue
- States the strategy as **`direct`** (seam exists in `chatOrchestrator.ts` line 107 where `lastUsage` is assigned)
- Lists all four acceptance tests
- Details the implementation facets (accumulate across rounds, pass sum to hook, update spec, add CHANGELOG entry)
- Identifies what's out of scope

### Test Failure Output

The failing tests show the actual vs expected behavior:

```
Expected sum of {250, 50, 300} but received {150, 30, 180}
Expected sum of {125, 25, 150} but received {75, 15, 90}
```

This proves the feature is absent and the tests fail for the right reason: the orchestrator is passing only `lastUsage` (the final round), not accumulated usage across all tool rounds.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}