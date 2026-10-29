**Strategy: `direct`.** I committed and pushed the [acceptance test](/var/tmp/loop-bench/runs/7f77fc9d62fc/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:22), the linked spec statement, and [.lore/dod.md](/var/tmp/loop-bench/runs/7f77fc9d62fc/workspace/target/.lore/dod.md). No production code changed. The branch is up to date with `origin/main` and fully pushed.

I ran only the acceptance file. It fails for the reported behavior: the caller receives the original rejection, while `onError` is skipped for non-`Error` values:

```text
"name": "string",
"callerReceivedOriginal": true,
- "hookCalls": 1,
+ "hookCalls": 0,
- "hookReceivedError": true,
+ "hookReceivedError": false,
```

The failure output shows the same zero hook calls for the plain object and `undefined` cases.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}