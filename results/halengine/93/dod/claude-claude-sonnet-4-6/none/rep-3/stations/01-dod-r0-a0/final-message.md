Branch is up to date and clean. Here is the actual failure output from the red bar:

```
FAIL src/orchestration/usage-accumulation.acceptance.test.ts
  ● afterModelResponse usage accumulation › reports summed token counts when both tool rounds reported usage

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
```

**Strategy: `direct`**

One acceptance test in `src/orchestration/usage-accumulation.acceptance.test.ts`. It drives `createChatOrchestrator` through a scripted two-round tool turn where round 1 reports `{10 in / 5 out / 15 total}` and round 2 reports `{20 in / 8 out / 28 total}`, then asserts `afterModelResponse` receives `{30 in / 13 out / 43 total}`. It fails now because `chatOrchestrator.ts:117` does `lastUsage = outcome.usage ?? lastUsage` (keeps the latest), delivering only the second round's figure. The test passes when the loop accumulates instead.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}