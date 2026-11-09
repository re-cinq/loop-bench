Committed and pushed the **direct** acceptance test and definition of done in commit `f814b98`. The branch is up to date with `origin/main` and its upstream.

The test failed for the reported under-count. From `npm test -- --runInBand --runTestsByPath src/orchestration/usage.acceptance.test.ts`:

```text
FAIL src/orchestration/usage.acceptance.test.ts
  ● reports usage across all provider calls, including when some rounds omit it

    - Expected  - 6
    + Received  + 6

      "all": Object {
    -   "inputTokens": 38,
    -   "outputTokens": 10,
    -   "totalTokens": 48,
    +   "inputTokens": 7,
    +   "outputTokens": 2,
    +   "totalTokens": 9,
      },
      "missing": Object {
    -   "inputTokens": 18,
    -   "outputTokens": 5,
    -   "totalTokens": 23,
    +   "inputTokens": 7,
    +   "outputTokens": 2,
    +   "totalTokens": 9,
      },
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}