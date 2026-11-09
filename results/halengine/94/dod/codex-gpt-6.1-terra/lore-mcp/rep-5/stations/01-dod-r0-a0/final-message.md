Committed and pushed the `direct` acceptance test and [Definition of Done](/var/tmp/loop-bench/runs/0219fabba772/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The targeted test failed for the reported reason: the original rejection was preserved, but both hooks were missing from the observed events.

```text
-     Array [
-       "onError",
-       true,
-       true,
-     ],
-     Array [
-       "afterSession",
-       true,
-     ],
      ],
      "sameRejection": true,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}