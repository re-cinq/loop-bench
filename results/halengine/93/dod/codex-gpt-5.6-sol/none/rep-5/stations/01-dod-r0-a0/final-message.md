Implemented and pushed the direct acceptance contract in commit `1b2872a`.

The new acceptance test fails for the intended reason:

```text
Expected:
{inputTokens: 18, outputTokens: 23, totalTokens: 41}
{inputTokens: 13, outputTokens: 16, totalTokens: 29}

Received:
{inputTokens: 11, outputTokens: 13, totalTokens: 24}
{inputTokens: 11, outputTokens: 13, totalTokens: 24}

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Command run:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts
```

The branch is synchronized with `origin/main`, pushed, and not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}