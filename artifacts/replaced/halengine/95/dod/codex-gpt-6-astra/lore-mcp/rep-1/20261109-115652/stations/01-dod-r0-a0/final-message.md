Committed and pushed `6648836` using `direct`. Added one acceptance test covering string, object, and `undefined` rejections, plus the DoD and spec link. No production code changed. Branch is current with `main` and fully pushed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
-     "calls": 1,
+     "calls": 0,
Tests:       1 failed, 1 total
```

All three original rejections reach the caller unchanged; none calls `onError`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}