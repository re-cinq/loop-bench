Committed and pushed `7582ca6` using `direct`. Added one acceptance test, linked the spec guarantee, and recorded the DoD. No production code changed. Base is current; working tree is clean.

Ran only `src/orchestration/onError.acceptance.test.ts`. Actual failure:

```text
-     "calls": 1,
+     "calls": 0,

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

All three non-Error cases miss the hook; original rejections remain unchanged. The test uses native generator rejection injection through the shared catch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}