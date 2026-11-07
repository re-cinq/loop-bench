I have defined the Definition of Done for ticket #93. I wrote a set of acceptance tests that verify the aggregation of usage across multiple tool rounds in the `afterModelResponse` hook. These tests fail today because the orchestrator only reports the usage of the last provider round. I also updated the relevant specification and the changelog to reflect the expected behavior change.

# Definition of Done

> A deployer billing or budgeting from this hook under-counts exactly the expensive turns, and nothing in the signature hints at it.

**Strategy: `direct`** — I can call the orchestrator with a provider that simulates multiple tool rounds and verify that the `afterModelResponse` hook receives the aggregated usage.

## Done when these pass

- [ ] **reports aggregated usage across multiple tool rounds** — A turn with two tool rounds must report the sum of usage from both provider calls.
  `src/orchestration/usage-aggregation.acceptance.test.ts`

- [ ] **reports exactly the same usage for a single round turn** — A turn with no tool calls must report the same usage it does today, ensuring no regressions for simple turns.
  `src/orchestration/usage-aggregation.acceptance.test.ts`

- [ ] **handles partial usage reporting correctly** — If some rounds don't report usage, they shouldn't make the total undefined or NaN.
  `src/orchestration/usage-aggregation.acceptance.test.ts`

## Failure Output

```
FAIL src/orchestration/usage-aggregation.acceptance.test.ts
  ● Usage aggregation acceptance tests › reports aggregated usage across multiple tool rounds

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

      70 |     await orchestrator.processMessage(createSession('ask'));
      71 |
    > 72 |     expect(capturedUsage).toEqual({
         |                           ^
      73 |       inputTokens: 30,
      74 |       outputTokens: 15,
      75 |       totalTokens: 45,
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}