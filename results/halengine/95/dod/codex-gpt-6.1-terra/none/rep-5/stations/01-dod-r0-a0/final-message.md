Committed and pushed the `direct` acceptance test and [definition of done](/var/tmp/loop-bench/runs/38d6d7db0923/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The test uses a rejecting lifecycle hook to exercise the same catch as a provider rejection, without a provider double. It failed for the reported reason:

```text
Expected: "calls": 1, "error": true
Received: "calls": 0, "error": false

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}