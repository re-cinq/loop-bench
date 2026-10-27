Added and pushed commit `1994319` with:

- Two failing acceptance tests in `src/orchestration/usageReporting.acceptance.test.ts`
- Updated spec traceability
- `.lore/dod.md` using `direct` strategy

Test run:

```text
Expected: { inputTokens: 30, outputTokens: 11, totalTokens: 41 }
Received: { inputTokens: 20, outputTokens: 7, totalTokens: 27 }
```

The missing-usage test passes. Branch is clean and synchronized with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}