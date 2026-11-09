Committed and pushed the `direct` acceptance test and [Definition of Done](/var/tmp/loop-bench/runs/7bff3cf848c7/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The test fails for the reported reason: the caller receives the original error, but neither hook runs. The relevant failure output was:

```text
-       "onError",
-       [Error: allocation failed],
...
-       "afterSession",
...
        "sameError": true,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}