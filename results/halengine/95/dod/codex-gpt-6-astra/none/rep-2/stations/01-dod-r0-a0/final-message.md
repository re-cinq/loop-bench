Committed and pushed `3961dff` using `direct`. Added one acceptance test, updated the spec link, and recorded the DoD. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```text
- "notificationCount": 1,
+ "notificationCount": 0,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

String, object, and `undefined` rejections reproduce the missing notification through the shared lifecycle catch. Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}