Committed and pushed the `direct` acceptance test, the spec link, and the [Definition of Done](/var/tmp/loop-bench/runs/06d6ecf3c37f/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The [acceptance test](/var/tmp/loop-bench/runs/06d6ecf3c37f/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:9) fails for the reported reason: the caller receives the original error, but neither hook runs.

```text
"calls": Array [
  "beforeSession",
- "onError",
- "afterSession",
],
"rejectedWithOriginalError": true,
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}