**Strategy: `direct`.** I committed and pushed the new acceptance test, the spec link, and [.lore/dod.md](/var/tmp/loop-bench/runs/c6f1eedb5c29/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The acceptance test ran and fails for the reported reason: the hook receives only the final provider call’s usage.

```text
Expected complete usage: 22 input, 10 output, 32 total
Received complete usage: 11 input, 5 output, 16 total
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}