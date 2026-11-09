Committed and pushed the **direct** acceptance test and [definition of done](/var/tmp/loop-bench/runs/2a8d8e272693/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The test exercises the orchestrator’s shared error path through a lifecycle hook. It fails for the reported reason: string, object, and `undefined` rejections bypass `onError`, while the original rejections still reach the caller. The existing `Error` case passes within the same test.

Actual failure output from `npm test -- --runInBand --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:

```text
FAIL src/orchestration/chatOrchestrator.acceptance.test.ts
  ● reports every rejection to onError while preserving the caller rejection

    - "calls": 1,
    - "errorInstance": true,
    + "calls": 0,
    + "errorInstance": false,
      "originalRejection": true,
    - "preservesValue": true,
    + "preservesValue": false,
      "rejected": true,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}