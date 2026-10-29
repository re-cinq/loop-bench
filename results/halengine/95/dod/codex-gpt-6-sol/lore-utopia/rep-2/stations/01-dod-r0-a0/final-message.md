**Strategy: `direct`.** I committed and pushed one acceptance test for string, plain object, and `undefined` provider rejections, plus the spec link and [.lore/dod.md](/var/tmp/loop-bench/runs/51bc58d674e8/workspace/target/.lore/dod.md). No production code changed. The branch is up to date with `origin/main` and its upstream.

I ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. It fails for the ticket’s stated reason in all three cases: the caller receives the original rejection, while `onError` is never called. The failure output reports:

```text
-     "hookCalls": 1,
+     "hookCalls": 0,
```

Commit: `26146a1`

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}