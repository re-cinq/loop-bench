**Strategy: `direct`.** I committed and pushed one acceptance test in [beforeSessionFailure.acceptance.test.ts](/var/tmp/loop-bench/runs/743c761d3eee/workspace/target/src/orchestration/beforeSessionFailure.acceptance.test.ts:7), with the spec link and [DoD](/var/tmp/loop-bench/runs/743c761d3eee/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

I ran only that test. It fails for the reported behavior:

```text
- "afterSessionReceivedSession": true,
+ "afterSessionReceivedSession": false,
  "calls": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
  ],
```

The original error still rejects the caller; both hooks are missing. Commit: `e40470f`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}