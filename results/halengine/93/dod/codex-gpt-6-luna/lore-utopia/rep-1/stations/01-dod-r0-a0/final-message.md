Added two direct acceptance tests and updated the spec and DoD. The tests were run with:

`npm test -- --runInBand --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

Both fail for the reported under-counting behavior. For example:

```text
Expected: {"inputTokens": 60, "outputTokens": 9, "totalTokens": 69}
Received: {"inputTokens": 30, "outputTokens": 4, "totalTokens": 34}
```

Committed as `4a3e556` (`Add usage aggregation acceptance tests`) and pushed. `origin/main` was already merged; the branch is clean and matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}