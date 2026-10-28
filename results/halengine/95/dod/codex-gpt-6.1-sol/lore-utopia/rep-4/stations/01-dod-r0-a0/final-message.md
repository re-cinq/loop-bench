Committed and pushed `2082e96` using strategy `direct`. Added one acceptance test, the spec guarantee/link, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
-     "hookCalls": 1,
-     "hookReceivesError": true,
+     "hookCalls": 0,
+     "hookReceivesError": false,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The test exercises real hook rejections through both public methods. `main` is merged; the working tree is clean and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}