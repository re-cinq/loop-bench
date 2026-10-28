Committed and pushed `d83f766` using `direct`. Branch is current with `origin/main`; working tree is clean. No production code changed.

Ran only `src/orchestration/chatOrchestrator.acceptance.test.ts`. Actual failure:

```diff
- "hookCalls": 1,
- "hookReceivesError": true,
+ "hookCalls": 0,
+ "hookReceivesError": false,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The test covers string, object, and `undefined` rejections through the shared catch using a lifecycle hook, across both caller APIs. DoD and spec traceability are included.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}