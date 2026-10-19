Branch is up to date. Here's the failure output from the two red acceptance tests:

```
FAIL src/orchestration/chatOrchestrator.usage.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › reports the sum of usage across two tool rounds, not only the last

    expect(received).toEqual(expected)
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 30,
    -   "outputTokens": 13,
    -   "totalTokens": 43,
    +   "inputTokens": 20,
    +   "outputTokens": 8,
    +   "totalTokens": 28,
      }

  ● afterModelResponse usage across tool rounds › sums only the rounds that reported usage, treating absent rounds as zero contribution

    expect(received).toEqual(expected)
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 120,
    -   "outputTokens": 58,
    -   "totalTokens": 178,
    +   "inputTokens": 20,
    +   "outputTokens": 8,
    +   "totalTokens": 28,
      }
```

Both tests fail because `afterModelResponse` currently receives the last round's `UsageMetadata` rather than the sum. The received value in both cases is the final round's tokens alone (`{20, 8, 28}`), confirming the ticket's claim.

**Strategy: `direct`** — the `afterModelResponse` hook is a real seam. Tests drive `createChatOrchestrator` with a scripted provider that emits known token counts per round and assert the hook sees the accumulated total.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}