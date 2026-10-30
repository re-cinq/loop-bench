Implemented and pushed the `direct` acceptance-test contract in commit `38592ec`.

New test: `src/orchestration/chatOrchestratorUsage.acceptance.test.ts`

It fails for the intended reason:

```text
Expected:
inputTokens: 18
outputTokens: 23
totalTokens: 41

Received:
inputTokens: 11
outputTokens: 13
totalTokens: 24
```

This proves `afterModelResponse` receives only the final provider call’s usage instead of the sum across all tool rounds. Missing-usage behavior is covered in the same scenario.

The branch is synchronized with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}