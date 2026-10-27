Added one direct acceptance test in [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/43276dd06825/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:7). It verifies the original rejection reaches the caller, `onError` receives the same session and error, and `afterSession` runs after failed setup. Updated the spec’s guarantee and added [`.lore/dod.md`](/var/tmp/loop-bench/runs/43276dd06825/workspace/target/.lore/dod.md).

The named test failed for the ticket’s stated reason:

```text
Expected calls: ["beforeSession", "onError", "afterSession"]
Received calls: ["beforeSession"]
observedError: undefined
observedSession: undefined
rejection: [Error: before session failed]
```

Committed and pushed as `70d8e87`. `origin/main` was already merged, and the branch is clean and even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}