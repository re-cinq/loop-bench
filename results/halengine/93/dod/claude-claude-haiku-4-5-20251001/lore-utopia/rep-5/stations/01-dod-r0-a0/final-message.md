Perfect! The acceptance tests are set up and committed. Here's the summary:

## Definition of Done for Ticket #93

I've written 4 acceptance tests in `src/orchestration/usage-accumulation.acceptance.test.ts` that define what "done" means for this ticket:

**Central claim (from ticket):** `afterModelResponse` receives only the usage of the final provider call in a turn, missing the usage from earlier rounds when tools are invoked. This under-counts exactly the expensive turns.

**Strategy: `direct`** — The `afterModelResponse` hook call site already exists at line 148 of `chatOrchestrator.ts`. We can accumulate usage across rounds by summing token counts instead of keeping only the last value.

### Test Results

```
FAIL src/orchestration/usage-accumulation.acceptance.test.ts

  ● afterModelResponse usage accumulation › accumulates usage across multiple tool rounds and reports the total

    expect(received).toEqual(expected)

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 175,
    -   "outputTokens": 90,
    -   "totalTokens": 265,
    +   "inputTokens": 75,
    +   "outputTokens": 40,
    +   "totalTokens": 115,
      }

Test Suites: 1 failed, 1 total
Tests:       1 failed, 3 passed, 4 total
```

**The one test that fails** ("accumulates usage across multiple tool rounds and reports the total") fails for the RIGHT reason: the orchestrator currently only passes the last round's usage (75, 40, 115) instead of the accumulated total (175, 90, 265) that accounts for both tool rounds.

**The three tests that pass** verify backward compatibility (single-round turns unchanged) and edge cases (missing usage, no usage).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}