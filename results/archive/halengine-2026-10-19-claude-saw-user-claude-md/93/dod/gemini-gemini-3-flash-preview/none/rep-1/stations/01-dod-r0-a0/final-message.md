I have defined the **Definition of Done** for ticket #93 by writing executable acceptance tests that fail for the reported reasons. 

I have chosen a **direct** strategy, utilizing the existing `createChatOrchestrator` and `processMessage` entry points with a scripted provider to simulate multi-round turns with distinct usage data.

The acceptance tests verify that:
1. `afterModelResponse` receives a sum of usage across all provider calls in a turn.
2. The hook receives a new fourth argument, `rounds: UsageMetadata[]`, containing the per-round breakdown.
3. Turns with no tool calls report exactly the same usage structure as before, maintaining compatibility with existing hooks.
4. Missing usage data in some rounds is handled gracefully, ensuring the total remains a valid sum of available data.

I have updated `specs/hal-engine-config-hooks/spec.md` to reflect the new behavior and linked it to the primary acceptance test. I also added a `CHANGELOG.md` entry documenting the change and the new `AggregatedUsage` type alias intended to make the hook signature unambiguous.

### Failure Output

```
FAIL src/orchestration/usage-reporting.acceptance.test.ts
  ● afterModelResponse usage reporting (acceptance) › reports aggregated usage across all tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 15,
    -   "totalTokens": 45,
    +   "inputTokens": 20,
    +   "outputTokens": 10,
    +   "totalTokens": 30,
      }

  ● afterModelResponse usage reporting (acceptance) › reports exactly what it reports today for turns with no tool calls

    expect(received).toEqual(expected) // deep equality

    Expected: [{"inputTokens": 10, "outputTokens": 5, "totalTokens": 15}]
    Received: undefined

  ● afterModelResponse usage reporting (acceptance) › handles missing usage in some rounds gracefully

    expect(received).toEqual(expected) // deep equality

    Expected: [{"inputTokens": 10, "outputTokens": 5, "totalTokens": 15}]
    Received: undefined

  ● afterModelResponse usage reporting (acceptance) › reports nothing when no rounds reported usage

    expect(received).toEqual(expected) // deep equality

    Expected: []
    Received: undefined
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}