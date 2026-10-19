Added and pushed commit `fc93f46` with:

- Two failing acceptance tests covering multi-round aggregation and missing usage.
- Updated spec traceability.
- `.lore/dod.md` using `direct` strategy.

Run command:

```text
npm test -- --runTestsByPath src/orchestration/usageAggregation.acceptance.test.ts
```

Actual failures show current last-round behavior:

```text
Expected inputTokens: 60, outputTokens: 12, totalTokens: 72
Received inputTokens: 30, outputTokens: 6, totalTokens: 36

Expected inputTokens: 18, outputTokens: 8, totalTokens: 26
Received inputTokens: 11, outputTokens: 5, totalTokens: 16
```

Branch is pushed and synchronized with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}