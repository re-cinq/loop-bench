Added and pushed commit `b193eb7` with:

- Two red acceptance tests covering aggregation and missing usage.
- Updated spec traceability.
- `.lore/dod.md` using `direct` strategy.
- No production code changes.

Test command:

```text
NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/usageAggregation.acceptance.test.ts
```

Failure: expected totals `{inputTokens: 60, outputTokens: 9, totalTokens: 69}`, received `{inputTokens: 30, outputTokens: 4, totalTokens: 34}`. Both acceptance tests fail for the under-counting behavior.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}