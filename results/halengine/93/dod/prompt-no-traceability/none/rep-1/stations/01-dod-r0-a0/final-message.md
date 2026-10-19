I have read the ticket and implemented the acceptance tests using the `direct` strategy, as the `afterModelResponse` hook is exposed publicly via the configuration block and can be observed cleanly by orchestrating a session through a scripted provider. 

The two new tests fail accurately because the orchestrator currently overwrites `lastUsage` instead of accumulating it:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● chatOrchestrator usage accumulation (#93) › reports sum of usage covering every provider call in a turn with multiple rounds

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

  ● chatOrchestrator usage accumulation (#93) › handles missing usage on some rounds without turning the sum into NaN or losing the counted rounds

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
```

The third acceptance criterion about a "turn where nothing reported still reports nothing" passes correctly on the main branch today (receiving `undefined`), so no failing test was required to prove its current state. The two failing tests, along with `.lore/dod.md`, have been formatted, committed, and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}