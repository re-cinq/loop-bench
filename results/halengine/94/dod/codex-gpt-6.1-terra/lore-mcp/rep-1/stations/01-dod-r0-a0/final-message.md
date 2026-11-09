Added and pushed one acceptance test using the `direct` strategy. It checks that a `beforeSession` error reaches the caller unchanged and that `onError` and `afterSession` run in order.

The test is red for the reported reason. The failure output shows the original error was preserved, while both hook calls were absent:

```text
-     Array [
-       "onError",
...
-       [Error: before session failed],
-     ],
-     Array [
-       "afterSession",
...
-     ],
      ],
      "sameError": true,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The test and handoff are in [beforeSession.acceptance.test.ts](/var/tmp/loop-bench/runs/c903f49e4f9d/workspace/target/src/orchestration/beforeSession.acceptance.test.ts) and [dod.md](/var/tmp/loop-bench/runs/c903f49e4f9d/workspace/target/.lore/dod.md). The branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}