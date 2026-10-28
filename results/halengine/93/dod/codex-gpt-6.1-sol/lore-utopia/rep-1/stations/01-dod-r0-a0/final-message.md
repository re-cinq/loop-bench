Committed and pushed `74960e1` using strategy `direct`. Added one acceptance test covering summed usage, missing usage, and unchanged direct answers. No production code changed.

Ran only the new test. Actual failure:

```diff
- "inputTokens": 71,
- "outputTokens": 15,
- "totalTokens": 86,
+ "inputTokens": 37,
+ "outputTokens": 7,
+ "totalTokens": 44,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Added `.lore/dod.md` and spec traceability. Branch is current with `origin/main`, with no unpushed changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}