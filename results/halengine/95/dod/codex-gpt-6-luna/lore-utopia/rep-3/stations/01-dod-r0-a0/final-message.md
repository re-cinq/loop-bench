Added and pushed one `direct` acceptance test covering string, plain-object, and `undefined` rejections. It fails on the reported behavior: `onError` is not called, although the caller receives the original string rejection. The test and its spec link are in [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/844319c577a5/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:8); the DoD is in [.lore/dod.md](/var/tmp/loop-bench/runs/844319c577a5/workspace/target/.lore/dod.md).

Failure output:

```text
"callerReceived": "provider failed",
- "observedCause": "provider failed",
- "observedErrorIsError": true,
- "onErrorCalls": 1,
+ "observedCause": undefined,
+ "observedErrorIsError": false,
+ "onErrorCalls": 0,
```

Committed as `df98ada` and pushed to `origin/loop-bench/95`. Merging `origin/main` reported “Already up to date”; the branch is even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}