Committed and pushed `d9231c5` using `direct`. Added one acceptance test, linked spec guarantee, and `.lore/dod.md`. No production code changed.

Ran only `src/orchestration/onError.acceptance.test.ts`. Actual failure:

```text
- "calls": 1,
+ "calls": 0,
Tests:       1 failed, 1 total
```

The test exercises real rejecting lifecycle hooks through the shared catch. Caller rejections remain unchanged; non-Error notifications are missing.

Branch is current with `main`, clean, and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}