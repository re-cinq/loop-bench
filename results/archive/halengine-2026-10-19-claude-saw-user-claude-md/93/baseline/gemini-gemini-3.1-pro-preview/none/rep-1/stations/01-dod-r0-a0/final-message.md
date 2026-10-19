The acceptance tests have been added and fail correctly because the orchestrator currently overwrites `lastUsage` instead of accumulating across all rounds. The `dod.md` records the choice to make the signature unambiguously represent a total sum of usage rather than simply the last round's breakdown.

The failure outputs from `npm test -- src/orchestration/afterModelResponse-usage.acceptance.test.ts` prove the red bar for the new tests:

```text
FAIL src/orchestration/afterModelResponse-usage.acceptance.test.ts
  ● afterModelResponse usage reporting › reports usage covering every provider call in that turn when driven through two tool rounds

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 50,
    -   "totalTokens": 80,
    +   "inputTokens": 5,
    +   "outputTokens": 5,
    +   "totalTokens": 10,
      }

  ● afterModelResponse usage reporting › a provider that reports no usage on some rounds does not make the total undefined or NaN

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 15,
    -   "outputTokens": 25,
    -   "totalTokens": 40,
    +   "inputTokens": 5,
    +   "outputTokens": 5,
    +   "totalTokens": 10,
      }
```

The third test (`a turn where nothing reported still reports nothing`) passes correctly. The existing test (`receives collected response text and usage` in `src/orchestration/chatOrchestrator.test.ts`) is also untouched, proving the single-round path remains exactly as it operates today. 

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}