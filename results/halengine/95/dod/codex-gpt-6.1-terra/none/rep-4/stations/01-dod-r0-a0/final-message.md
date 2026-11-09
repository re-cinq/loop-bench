Committed and pushed the `direct` acceptance test and definition of done. The branch is up to date with `origin/main` and its upstream.

The test uses a lifecycle hook to throw real values through the orchestrator’s catch path. It covers string, object and `undefined` rejections, plus existing `Error` identity. The ticket’s provider-specific scenario is not separately exercised.

The named test failed for the reported reason:

```text
FAIL src/orchestration/onError.acceptance.test.ts

- "calledOnce": true,
- "isError": true,
- "preservesValue": true,
+ "calledOnce": false,
+ "isError": false,
+ "preservesValue": false,
  "rejectedUnchanged": true,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}