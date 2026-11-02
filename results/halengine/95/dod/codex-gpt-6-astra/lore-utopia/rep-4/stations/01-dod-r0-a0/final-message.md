Committed and pushed `3135bc7` using strategy `direct`. Added one acceptance test, spec linkage, and `.lore/dod.md`; no production changes.

Ran only `src/orchestration/onError.acceptance.test.ts`. Actual failure:

```text
-     "hookCalls": 1,
+     "hookCalls": 0,
Tests:       1 failed, 1 total
```

The test injects real hook rejections through the shared catch path. `main` is merged; the branch is clean and synchronized.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}