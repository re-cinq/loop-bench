Committed and pushed `2e4f277` using `direct`. Added one acceptance matrix, the linked spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
-     "hookCalls": 1,
+     "hookCalls": 0,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Tests exercise hook rejections through the shared catch without provider doubles. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}