Committed and pushed the **direct** acceptance test and [definition of done](/var/tmp/loop-bench/runs/14f6745a2978/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The named test fails for the ticket’s stated reason: the original error reaches the caller, but the expected `onError` and `afterSession` events are absent. The failure output includes:

```text
-       "onError",
-       [Error: allocation failed],
-       "afterSession",
        "rejection": [Error: allocation failed],

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}