Committed and pushed `1c62b52` using strategy `direct`. Added one acceptance test covering string, object, and `undefined` rejections, plus existing `Error` identity. No production code changed.

Ran only the new acceptance file. Actual failure:

```text
-     "hookCalls": 1,
+     "hookCalls": 0,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The spec and DoD are linked. Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}