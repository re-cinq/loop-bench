Committed and pushed `b720293` with one acceptance test, the DoD, and the linked spec guarantee. Strategy: `direct`. No production code changed.

Ran only the acceptance file. Actual failure:

```diff
-     "hookCalls": 1,
+     "hookCalls": 0,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

String, object, and `undefined` rejections bypass the hook through both entry points. The test uses a real lifecycle hook to reach the shared catch without mocks or network access.

Branch is current with `origin/main`, fully pushed, and clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}