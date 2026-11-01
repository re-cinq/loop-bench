Committed and pushed `97f3bec` using strategy `direct`. Added one acceptance test, the spec guarantee, and `.lore/dod.md`. No production code changed. Branch is current with `origin/main` and fully pushed.

Ran only the new acceptance file. Actual failure output:

```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
    "caller",
  ],
- "resourcesRemaining": 0,
+ "resourcesRemaining": 1,
  "sameRejection": true,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}