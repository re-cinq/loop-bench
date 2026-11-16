Pushed. Here's the summary:

**Strategy: `direct`** — the `afterModelResponse` hook is a live seam; the tests call `createChatOrchestrator` with a scripted multi-round provider and assert on what the hook receives.

**Two failing acceptance tests** in `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`:

1. **sums usage over two tool rounds** — provider emits three rounds with known, different token counts (10/5/15 + 20/8/28 + 15/6/21); the hook currently receives `{15, 6, 21}` (last round only) instead of the expected sum `{45, 19, 64}`.

2. **counts rounds that reported when an intermediate round reports no usage** — three rounds where the middle returns `undefined`; the hook currently receives `{20, 8, 28}` (round 2, discarding round 0) instead of the expected sum `{30, 13, 43}`.

Both fail because `chatOrchestrator.ts:117` does `lastUsage = outcome.usage ?? lastUsage`, which overwrites rather than accumulates.

Actual failure output:
```
● sums usage over two tool rounds so a deployer sees the full turn cost
    - Expected:  inputTokens: 45, outputTokens: 19, totalTokens: 64
    + Received:  inputTokens: 15, outputTokens:  6, totalTokens: 21

● counts rounds that reported when an intermediate round reports no usage
    - Expected:  inputTokens: 30, outputTokens: 13, totalTokens: 43
    + Received:  inputTokens: 20, outputTokens:  8, totalTokens: 28
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}