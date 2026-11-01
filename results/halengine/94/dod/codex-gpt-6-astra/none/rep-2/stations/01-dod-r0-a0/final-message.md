Committed and pushed `752622a` using strategy `direct`. Added one acceptance test, the DoD, and the spec’s cleanup guarantee. No production code changed.

Ran only `src/orchestration/beforeSession.acceptance.test.ts`. Actual failure excerpt:

```diff
  "events": Array [
    "beforeSession",
-   "onError",
-   "afterSession",
    "caller",
  ],
  "originalRejection": true,
- "unreleasedResources": 0,
+ "unreleasedResources": 1,
```

`main` is already merged; the working tree is clean and the branch matches its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}