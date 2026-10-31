Added and pushed commit `b48f819` with the direct red acceptance contract, updated spec traceability, and `.lore/dod.md`.

Ran only:

`npm test -- src/orchestration/chatOrchestrator.usage.acceptance.test.ts`

Actual failure:

```text
Expected: inputTokens 51, outputTokens 10, totalTokens 61
Received: inputTokens 23, outputTokens 5, totalTokens 28
```

This proves `afterModelResponse` still receives only the final provider call’s usage across two tool rounds. Branch is pushed and merged with current `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}