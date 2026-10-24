## Summary

I've defined the acceptance tests for ticket #93: "Report usage across every tool round, not just the last". The tests are now committed and pushed.

### Test Results

5 tests total: **3 fail** (as expected), **2 pass** (the unchanged cases):

**Failing tests (behavior is absent):**
1. **reports accumulated usage from every provider call across two tool rounds** — expects `{inputTokens: 30, outputTokens: 15, totalTokens: 45}` (sum of rounds) but gets `{inputTokens: 20, outputTokens: 10, totalTokens: 30}` (last round only)
2. **reports usage across three tool rounds** — expects sum of three rounds but gets only the last round
3. **reports correct accumulated usage when some rounds report no usage** — expects sum of reporting rounds but gets only the last

**Passing tests (unchanged behavior):**
1. **reports undefined when no rounds report any usage** — correctly reports nothing when nothing was reported
2. **reports the same single usage for a turn with no tool calls** — correctly reports the single round's usage (no tools case)

### Central Claim (from ticket)

> `afterModelResponse` is called once per user message after the round loop exits, and is passed the `lastUsage` local — the most recent round's usage, not a sum across tool rounds, so a deployer using the hook for billing or audit under-counts every turn that ran tools.

The tests directly verify that line 117 of `chatOrchestrator.ts` (`lastUsage = outcome.usage ?? lastUsage`) overwrites instead of accumulates, causing the under-counting that the ticket aims to fix.

### Artifacts

- `.lore/dod.md` — Definition of done documenting the five acceptance tests
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — 5 tests using the scripted provider pattern from the existing test suite

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}