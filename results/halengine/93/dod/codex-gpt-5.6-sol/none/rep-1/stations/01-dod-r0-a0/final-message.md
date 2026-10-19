Defined and pushed the `direct` acceptance contract in commit `cf13154`.

Added:

- One focused acceptance test for summed multi-round usage, partially missing usage, and entirely absent usage.
- Traceability from the hook specification.
- `.lore/dod.md` with implementation facets and scope.

Command run:

```text
npm test -- --runTestsByPath src/orchestration/usageAcrossRounds.acceptance.test.ts
```

Actual failure:

```text
FAIL src/orchestration/usageAcrossRounds.acceptance.test.ts
● reports the summed usage of every provider call while preserving absent usage

- Expected  - 6
+ Received  + 6

  "everyRound": {
-   "inputTokens": 51,
-   "outputTokens": 10,
-   "totalTokens": 61,
+   "inputTokens": 23,
+   "outputTokens": 5,
+   "totalTokens": 28,
  },
  "noRounds": undefined,
  "someRounds": {
-   "inputTokens": 34,
-   "outputTokens": 7,
-   "totalTokens": 41,
+   "inputTokens": 23,
+   "outputTokens": 5,
+   "totalTokens": 28,
  }

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The branch is synchronized with `origin/loop-bench/93` and current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}