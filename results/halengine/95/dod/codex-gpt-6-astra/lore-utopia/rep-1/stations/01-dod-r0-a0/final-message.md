Committed and pushed `f6fd989` using `direct`. Added one acceptance test, the spec link, and `.lore/dod.md`. No production code changed.

Ran only the acceptance file. All three non-`Error` cases failed as expected:

```diff
- "hookCalls": 1,
- "hookReceivedError": true,
+ "hookCalls": 0,
+ "hookReceivedError": false,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

Branch is synchronized with upstream and current with `main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}