## Summary

I have successfully defined the acceptance tests for ticket #93 "Report usage across every tool round, not just the last". The tests are now committed and pushed.

**What was created:**

1. **Acceptance test file** (`src/orchestration/chatOrchestrator.usage-accumulation.acceptance.test.ts`) with 5 tests:
   - ✅ **PASSING**: "reports exactly what it reports today when no tool calls occur" — validates backward compatibility for simple turns
   - ✅ **PASSING**: "reports undefined when no rounds report any usage" — validates that undefined is preserved when no usage is reported
   - ❌ **FAILING**: "accumulates usage from every provider call across multiple tool rounds" — validates that usage from all 3 rounds sums correctly
   - ❌ **FAILING**: "handles rounds with no usage reported, accumulating only those that reported" — validates partial accumulation (skips rounds without usage)
   - ❌ **FAILING**: "accumulates usage from two tool rounds with distinct token counts" — validates accumulation across 2 rounds

2. **Definition of Done** (`.lore/dod.md`) documenting:
   - Central claim from the ticket (verbatim)
   - Direct strategy (seam already exists via the `afterModelResponse` hook)
   - 5 acceptance test criteria that must pass
   - 4 facets of implementation work needed

**Test failure output (the RED BAR):**

The tests fail exactly as expected — the hook currently receives only the last round's usage, not the accumulated total:

```
accumulates usage from every provider call across multiple tool rounds
  Expected: {inputTokens: 35, outputTokens: 17, totalTokens: 52}
  Received: {inputTokens: 5, outputTokens: 2, totalTokens: 7}

handles rounds with no usage reported, accumulating only those that reported
  Expected: {inputTokens: 30, outputTokens: 15, totalTokens: 45}
  Received: {inputTokens: 20, outputTokens: 10, totalTokens: 30}

accumulates usage from two tool rounds with distinct token counts
  Expected: {inputTokens: 40, outputTokens: 20, totalTokens: 60}
  Received: {inputTokens: 25, outputTokens: 12, totalTokens: 37}

Tests: 3 failed, 2 passed, 5 total
```

The failures demonstrate that `lastUsage = outcome.usage ?? lastUsage` (line 117 of chatOrchestrator.ts) overwrites instead of accumulates — fixing this is the implementation task.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}