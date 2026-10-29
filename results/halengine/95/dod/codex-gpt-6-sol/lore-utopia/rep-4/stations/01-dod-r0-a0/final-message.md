**Direct strategy.** I committed and pushed the new acceptance test, its spec link, and [.lore/dod.md](/var/tmp/loop-bench/runs/40d113e68f7f/workspace/target/.lore/dod.md). No production code changed. The branch is up to date with `origin/main` and its upstream.

I ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. It fails for the reported behavior:

```text
"name": "string" / "plain object" / "undefined"
- "hookCalls": 1
+ "hookCalls": 0
- "hookReceivedError": true
+ "hookReceivedError": false
"callerReceivedOriginal": true
```

Commit: `7946579`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}