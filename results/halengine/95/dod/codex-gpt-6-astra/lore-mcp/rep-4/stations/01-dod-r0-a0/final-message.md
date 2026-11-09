Committed and pushed `253fe2b` using strategy `direct`. Added one acceptance test, linked the spec guarantee, and recorded the DoD. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
-     "hookCalls": 1,
+     "hookCalls": 0,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Covers string, object, and `undefined` rejections through both caller APIs. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}