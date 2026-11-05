Committed and pushed `931e2fb` using strategy `direct`. Added one acceptance test, the DoD, and the cleanup contract in the spec. No production changes. Branch is current with `origin/main` and fully pushed.

Ran only the new acceptance file. Actual failure:

```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
  ],
  "originalRejection": true,
- "resourcesRemaining": 0,
+ "resourcesRemaining": 1,
```

```text
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}