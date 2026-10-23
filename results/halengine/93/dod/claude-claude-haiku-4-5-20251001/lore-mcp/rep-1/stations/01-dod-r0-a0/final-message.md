Perfect! I've defined the acceptance tests for ticket #93. Here's the summary:

## Definition of Done Established

**Ticket**: Report usage across every tool round, not just the last

**Strategy**: `direct` — The orchestrator's usage accumulation logic is a clear seam that can be modified directly in `chatOrchestrator.ts` where `lastUsage` is currently managed.

**Acceptance Tests Created** (`src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts`):

1. **Accumulates usage across multiple tool rounds** — Verifies the hook receives summed token counts from all rounds
2. **Handles partial usage gracefully** — Rounds with no usage report don't break accumulation
3. **Maintains backward compatibility** — Single-round turns unchanged
4. **Reports no usage when appropriate** — All rounds with no usage yields undefined, not NaN

**Test Failure Output** (RED BAR - as required):

```
FAIL src/orchestration/chatOrchestrator-usage-accumulation.acceptance.test.ts
  ● accumulates usage across multiple tool rounds, reporting the sum to afterModelResponse

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 180,
    -   "outputTokens": 90,
    -   "totalTokens": 270,
    +   "inputTokens": 100,
    +   "outputTokens": 50,
    +   "totalTokens": 150,
      }

  ● handles partial usage gracefully: rounds that report no usage are skipped, not breaking accumulation

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 180,
    -   "outputTokens": 90,
    -   "totalTokens": 270,
    +   "inputTokens": 100,
    +   "outputTokens": 50,
    +   "totalTokens": 150,
      }

Tests:       2 failed, 2 passed, 4 total
```

The tests fail **for the right reason**: the orchestrator currently overwrites `lastUsage` with each round instead of accumulating it—exactly the problem stated in the ticket. The expected values show the sum of all rounds' usage, but the received values show only the final round's usage.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}