**Strategy: `direct`.** I committed and pushed one acceptance test for ticket #94, with its spec link and [Definition of Done](/var/tmp/loop-bench/runs/236dc4fccff5/workspace/target/.lore/dod.md). No production code changed. The branch is up to date with `origin/main` and its upstream.

I ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. It fails for the reported reason: the original error reaches the caller, but both cleanup hooks are missing.

```text
-   "afterSessionEntryCount": 1,
-   "afterSessionReceivedSession": true,
+   "afterSessionEntryCount": undefined,
+   "afterSessionReceivedSession": false,
    "calls": Array [
      "beforeSession",
-     "onError",
-     "afterSession",
    ],
-   "onErrorReceivedError": true,
+   "onErrorReceivedError": false,
    "originalRejection": true,
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}