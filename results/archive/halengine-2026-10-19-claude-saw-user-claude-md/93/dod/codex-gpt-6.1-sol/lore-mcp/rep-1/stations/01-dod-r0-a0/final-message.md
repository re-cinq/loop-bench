Committed and pushed `32c7540` using `direct`. One acceptance test covers all rounds, missing usage, and direct answers. No production code changed.

Ran only `src/orchestration/chatOrchestrator-usage.acceptance.test.ts`. Actual failure:

```diff
- "totalTokens": 85,
+ "totalTokens": 44,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Added the DoD and spec traceability. Base is merged; working tree is clean and upstream is current.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}