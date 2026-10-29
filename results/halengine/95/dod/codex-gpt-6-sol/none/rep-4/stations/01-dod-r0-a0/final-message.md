Committed and pushed the `direct` acceptance test, spec link, and [Definition of Done](/var/tmp/loop-bench/runs/3e6dc4adf7b7/workspace/target/.lore/dod.md). The branch is up to date with `origin/main` and its upstream.

The [acceptance test](/var/tmp/loop-bench/runs/3e6dc4adf7b7/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:12) was run alone and fails for the reported behavior:

```text
"name": "string",
- "onErrorCalls": 1,
+ "onErrorCalls": 0,
"name": "plain object",
- "onErrorCalls": 1,
+ "onErrorCalls": 0,
"name": "undefined",
- "onErrorCalls": 1,
+ "onErrorCalls": 0,
Tests: 1 failed, 1 total
```

Commit: `6101072`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}