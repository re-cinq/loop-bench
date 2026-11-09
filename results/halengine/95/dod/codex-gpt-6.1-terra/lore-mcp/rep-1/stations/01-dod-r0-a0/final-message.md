Committed and pushed the `direct` acceptance test and [definition of done](/var/tmp/loop-bench/runs/7ddffca8584b/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The test exercises the shared catch path through a throwing lifecycle hook; it does not inject a rejecting provider. It checks string, object, `undefined`, and existing `Error` values.

The named Jest test failed for the reported reason:

```text
- "calls": 1,
- "isError": true,
+ "calls": 0,
+ "isError": false,
  "rejectedUnchanged": true,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}