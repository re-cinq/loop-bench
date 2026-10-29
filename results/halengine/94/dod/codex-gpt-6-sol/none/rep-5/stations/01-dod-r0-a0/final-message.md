Added and pushed one `direct` acceptance test in [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/a3ebd913d19c/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:9). It checks that a failed `beforeSession` preserves the caller’s rejection and invokes `onError` followed by `afterSession`. The [spec](/var/tmp/loop-bench/runs/a3ebd913d19c/workspace/target/specs/hal-engine-config-hooks/spec.md) and [DoD](/var/tmp/loop-bench/runs/a3ebd913d19c/workspace/target/.lore/dod.md) record the guarantee and remaining work.

The named test ran and failed for the reported behavior:

```text
"calls": Array [
  "beforeSession",
- "onError",
- "afterSession",
],
"onErrorReceivedError": false,
"afterSessionReceivedSession": false,
"sameRejection": true,
```

Commit `a1ed78a` is pushed; the branch is up to date with `origin/main` and its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}