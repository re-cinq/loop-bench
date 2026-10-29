Committed and pushed the `direct` DoD in `3e6a6e3`. The new [acceptance test](/var/tmp/loop-bench/runs/2ab98da18fae/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:7) covers string, plain-object, `undefined`, and existing `Error` rejections. The [spec](/var/tmp/loop-bench/runs/2ab98da18fae/workspace/target/specs/hal-engine-config-hooks/spec.md) links to it, and [.lore/dod.md](/var/tmp/loop-bench/runs/2ab98da18fae/workspace/target/.lore/dod.md) records the remaining work.

I ran only that test. It fails for the reported reason; the failure output shows this for each non-`Error` case:

```text
"callerReceivedOriginal": true,
- "hookCalls": 1,
+ "hookCalls": 0,
- "hookCauseIsOriginal": true,
+ "hookCauseIsOriginal": false,
```

The branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}