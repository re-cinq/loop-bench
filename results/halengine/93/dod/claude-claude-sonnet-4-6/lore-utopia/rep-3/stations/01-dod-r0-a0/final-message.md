Branch is up to date. Here is the red bar:

**Strategy: `direct`**

The seam is `afterModelResponse`. The test drives `processMessage` through the real orchestrator with a scripted provider whose two rounds emit known, different token counts, then asserts the hook receives the sum.

**Acceptance test** — `src/orchestration/chatOrchestrator.acceptance.test.ts`

```
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● afterModelResponse usage accumulation
    › afterModelResponse receives summed usage across all tool rounds, not only the last round

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

The test fails because `chatOrchestrator.ts:117` does `lastUsage = outcome.usage ?? lastUsage`, so the hook only ever sees the last round's usage. When both rounds have different token counts (10+5=15 and 20+8=28), the hook receives `{20, 8, 28}` rather than the sum `{30, 13, 43}`.

The spec (`specs/hal-engine-config-hooks/spec.md`) now has a new "Usage across tool rounds" section with the intended behavior and the validated-by link pointing at line 40 of the acceptance test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}