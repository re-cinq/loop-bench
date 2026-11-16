Done. Here's the summary:

**Strategy: `direct`** — `createChatOrchestrator` with an `afterModelResponse` hook and a scripted multi-round provider is an existing seam requiring no new production code.

**Two acceptance tests in `src/orchestration/chatOrchestrator.acceptance.test.ts`**, both red for the right reason:

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● reports the sum of every round when two tool rounds each return known token counts

    Expected: {inputTokens: 30, outputTokens: 13, totalTokens: 43}
    Received: {inputTokens: 20, outputTokens: 8, totalTokens: 28}   ← last round only

  ● accumulates only the rounds that reported usage when some rounds report none

    Expected: {inputTokens: 30, outputTokens: 13, totalTokens: 43}
    Received: {inputTokens: 20, outputTokens: 8, totalTokens: 28}   ← last round only
```

Both fail because `lastUsage = outcome.usage ?? lastUsage` takes the most recent round rather than accumulating. The fix is to sum across rounds in `chatOrchestrator.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}