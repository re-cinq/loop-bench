Added, committed, and pushed two direct acceptance tests plus `.lore/dod.md` and spec traceability.

Command run:

`npm test -- --runTestsByPath src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

Actual failures:

```text
Expected: {inputTokens: 60, outputTokens: 6, totalTokens: 66}
Received: {inputTokens: 30, outputTokens: 3, totalTokens: 33}

Expected someUsage: {inputTokens: 18, outputTokens: 6, totalTokens: 24}
Received someUsage: {inputTokens: 11, outputTokens: 4, totalTokens: 15}

Test Suites: 1 failed, 1 total
Tests:       2 failed, 2 total
```

This confirms only the final provider call is currently reported. Commit `abb4971` is pushed, merged with current `origin/main`, and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}