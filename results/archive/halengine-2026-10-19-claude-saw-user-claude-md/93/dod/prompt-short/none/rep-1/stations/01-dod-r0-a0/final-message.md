I have defined the acceptance tests for the usage reporting ticket by injecting a scripted provider that reports known token counts across multiple tool rounds, observing the arguments received by `afterModelResponse`. The tests fail because the hook receives only the final round's usage instead of the accumulated total, exactly as the ticket describes.

```
FAIL src/orchestration/usageReporting.acceptance.test.ts

  ● Usage reporting across tool rounds › reports usage covering every provider call in that turn, asserted against a scripted provider whose rounds report known, different token counts

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 45,
    -   "outputTokens": 23,
    -   "totalTokens": 68,
    +   "inputTokens": 15,
    +   "outputTokens": 10,
    +   "totalTokens": 25,
      }

  ● Usage reporting across tool rounds › a provider that reports no usage on some rounds does not make the total undefined or NaN: the rounds that reported are still counted

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 25,
    -   "outputTokens": 15,
    -   "totalTokens": 40,
    +   "inputTokens": 15,
    +   "outputTokens": 10,
    +   "totalTokens": 25,
      }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}