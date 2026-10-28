Committed and pushed `2ebfb72` using `direct`. Added one acceptance test covering string, object, and `undefined` rejections through both APIs, plus the linked spec guarantee and DoD. No production code changed.

Ran only the new acceptance file. Actual failure:

```text
-     "calls": 1,
+     "calls": 0,
Tests:       1 failed, 1 total
```

Original rejection identity is preserved; `onError` is never called. The test uses real rejecting lifecycle hooks through the shared handler.

Branch is current with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}