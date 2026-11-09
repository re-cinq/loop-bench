Committed and pushed the **direct** acceptance test and definition of done. The branch is up to date with `origin/main` and its upstream.

The targeted test failed as intended: the failure diff showed the expected `onError` and `afterSession` calls missing, while `"sameError": true` confirmed the original rejection reached the caller.

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● beforeSession failure › reports the error and runs cleanup before rejecting when beforeSession throws

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}