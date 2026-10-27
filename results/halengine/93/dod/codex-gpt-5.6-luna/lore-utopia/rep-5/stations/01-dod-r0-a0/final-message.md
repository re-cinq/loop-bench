Implemented and pushed commit `3ef1ca1`.

- Strategy: `direct`
- Added two red acceptance tests in `src/orchestration/usageAggregation.acceptance.test.ts`
- Added `.lore/dod.md`
- Updated spec traceability
- Branch is synchronized with upstream

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/usageAggregation.acceptance.test.ts
```

Failure confirms current last-round behavior:

```text
Expected: inputTokens 30, outputTokens 11, totalTokens 41
Received: inputTokens 20, outputTokens 7, totalTokens 27
```

Both acceptance tests fail for the intended reason.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}