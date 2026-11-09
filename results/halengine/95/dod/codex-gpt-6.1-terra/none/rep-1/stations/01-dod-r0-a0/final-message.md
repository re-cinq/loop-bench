Committed and pushed the `direct` acceptance test and [definition of done](/var/tmp/loop-bench/runs/151eb4fc2b23/workspace/target/.lore/dod.md). The test exercises rejections from a lifecycle hook through the same orchestrator catch used for provider failures.

The named test failed for the reported reason: the non-`Error` values propagated unchanged, but the hook was not called. The failure output included:

```text
- "calls": 1,
- "isError": true,
+ "calls": 0,
+ "isError": false,
  "original": true,
```

The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}